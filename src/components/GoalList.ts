import { BaseComponent } from '../core/Component';

const CENTRAL_INDEX = 4;
const FINAL_GOAL_PLACEHOLDER = "최종 목표";
const SUB_GOAL_PLACEHOLDER = "목표";

export type Goal = {
  id: number;
  type: "final" | "sub";
  ideas: Idea[];
}

type Idea = {
  id: number;
  type: "main" | "sub";
  name: string | null;
}

type GoalListState = {
  goals: Goal[]
}

type GoalListProps = {
  goals: Goal[]
}

export class GoalList extends BaseComponent<HTMLElement, GoalListState, GoalListProps> {
  constructor($target: HTMLElement, props: GoalListProps) {
    super($target, props)
  }

  async setup() {
    const { goals } = this.props;

    this.state = {
      goals: goals.length > 0 ? goals : Array(9).fill(null).map((_, idx) => {
        return {
          id: idx,
          ideas: this.getInitialIdeas(),
          type: idx === CENTRAL_INDEX ? "final" : "sub"
        }
      }),
    }
  }

  template() {
    const goals = this.state.goals;
    return `
      <ul class="goals">
        ${goals.map((goal) => {
      const namedIdeas = goal.ideas.filter(idea => {
        return idea.name || this.finalGoal.ideas[goal.id].name
      })
      const isEmptyGoal = namedIdeas.length === 0;

      return `
          <li class="goal ${goal.type} ${(isEmptyGoal && goal.type === "sub") ? "disabled" : null}" data-goal-id="${goal.id}">
            ${goal.ideas.map((idea) => `
            <div class="idea ${idea.type}" data-idea-id="${idea.id}">
              <textarea
                class="idea-textarea"
                maxlength="20"
                placeholder="${this.getTextareaPlaceholder(goal, idea)}"
                >${this.getTextareaValue(goal, idea)}</textarea>
            </div>
            `).join("")}
          </li>`
    })
        .join("")}
      </ul>
      `
  }

  setEvent() {
    this.$target.addEventListener("change", (e) => {
      const target = e.target as HTMLTextAreaElement;
      const targetGoal = target.closest("[data-goal-id]") as HTMLLIElement;
      const targetIdea = target.closest("[data-idea-id]") as HTMLDivElement;

      const targetGoalId = Number(targetGoal.dataset["goalId"]);
      const targetIdeaId = Number(targetIdea.dataset["ideaId"]);

      const newState = { ...this.state };
      newState.goals[targetGoalId].ideas[targetIdeaId].name = target.value;

      this.setState(newState);
    })
  }

  get finalGoal(): Goal {
    return this.state.goals.filter(goal => goal.id === CENTRAL_INDEX)[0];
  }

  private getInitialIdeas(): Idea[] {
    return Array(9).fill(null).map((_, idx) => {
      return {
        id: idx,
        name: null,
        type: idx === CENTRAL_INDEX ? "main" : "sub"
      }
    })
  }

  private getTextareaPlaceholder(goal: Goal, idea: Idea): string {
    if (goal.type === "final") {
      if (idea.type === "main") {
        return FINAL_GOAL_PLACEHOLDER
      } else {
        return `${SUB_GOAL_PLACEHOLDER} ${idea.id + 1}`
      }
    } else {
      if (idea.type === "main") {
        return `${SUB_GOAL_PLACEHOLDER} ${goal.id + 1}`
      } else {
        return ""
      }
    }
  }

  private getTextareaValue(goal: Goal, idea: Idea): string {
    // sub goal의 중앙 텍스트는 최종 목표칸에서 작성한 목표와 싱크가 맞아야 함.
    if (goal.type === "sub" && idea.type === "main") {
      return this.finalGoal.ideas[goal.id].name ?? "";
    }

    return idea.name ?? "";
  }
}