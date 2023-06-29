import inquirer from "inquirer";

interface Choice {
    label: string;
    action: () => void;
    disabled: boolean;
}

export class Prompted {
    choices: Choice[] = [];

    async promptUser() {
        const promptQuestion = [
            {
                type: 'list',
                name: 'selectedAction',
                message: 'Choose an action:',
                choices: this.choices
                    .filter(choice => !choice.disabled)
                    .map(choice => choice.label)
            }
        ];

        const { selectedAction } = await inquirer.prompt(promptQuestion);

        const selectedChoice = this.choices.find(choice => choice.label === selectedAction);
        if (selectedChoice) {
            selectedChoice.disabled = true;
            selectedChoice.action();
        }

        this.promptUser();
    }
}