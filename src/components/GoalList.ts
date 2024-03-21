import { BaseComponent } from '../core/Component';
import { Goal, Idea } from '../utils/types';
import { GoalListItem } from '../components/GoalListItem';

const CENTRAL_INDEX = 4;

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
    const { goals } = this.state;
    return `
      <ul class="goal-list">
        ${goals.map((goal) => {
      return `<li class="goal ${goal.type}" data-goal-id="${goal.id}"></li>`
    }).join("")}
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

  mounted() {
    const $goals = document.querySelectorAll(".goal") as NodeListOf<HTMLLIElement>;

    $goals.forEach(($goal, index) => {
      const goal = this.state.goals[index];

      const namedIdeas = goal.ideas.filter(idea => {
        return idea.name || this.finalGoal.ideas[goal.id].name;
      })
      const isEmptyGoal = namedIdeas.length === 0;

      new GoalListItem($goal, {
        ...goal,
        title: this.finalGoal.ideas[index].name || "",
        disabled: isEmptyGoal
      });
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
}