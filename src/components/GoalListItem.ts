import { BaseComponent } from '../core/Component';
import { Goal, Idea } from './GoalList';

const FINAL_GOAL_PLACEHOLDER = "최종 목표";
const SUB_GOAL_PLACEHOLDER = "목표";

type GoalListItemProps = Goal & {
  title: string;
}

export class GoalListItem extends BaseComponent<HTMLElement, {}, GoalListItemProps> {
  constructor($target: HTMLElement, props: GoalListItemProps) {
    super($target, props)
  }

  template() {
    const { ideas, type } = this.props;

    return `
      ${ideas.map((idea) => `
        <div class="idea ${idea.type}" data-idea-id="${idea.id}">
          <textarea
            class="idea-textarea"
            maxlength="20"
            placeholder="${this.getTextareaPlaceholder(idea)}"
            ` + ((type === "sub" && idea.type === "main") ? "disabled" : "") + `
            >${this.getTextareaValue(idea)}</textarea>
        </div>
      `).join("")}
    `
  }

  private getTextareaPlaceholder(idea: Idea): string {
    const { id, type } = this.props;

    if (type === "final") {
      if (idea.type === "main") {
        return FINAL_GOAL_PLACEHOLDER
      } else {
        return `${SUB_GOAL_PLACEHOLDER} ${idea.id + 1} `
      }
    } else {
      if (idea.type === "main") {
        return `${SUB_GOAL_PLACEHOLDER} ${id + 1} `
      } else {
        return ""
      }
    }
  }

  private getTextareaValue(idea: Idea): string {
    const { type, title } = this.props;

    // Goal 타입이 sub이고 Idea 타입이 main인 경우, 동기화가 필요한 영역이므로 props로 전달받은 title을 렌더링
    const needTextSync = type === "sub" && idea.type === "main";

    if (needTextSync) {
      return title;
    }

    return idea.name ?? "";
  }
}