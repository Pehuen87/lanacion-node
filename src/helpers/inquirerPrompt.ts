import inquirer from "inquirer";


interface InquirerChoice {
    choice: string;
    action: () => void;
    disabled: boolean;
  }

export class Prompted{
     inquirerChoices: InquirerChoice[] = []
    
     async inquirerPrompt(){

    const promptQuestion = [
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: this.inquirerChoices.filter(item => !item.disabled).map(item => item.choice)
        }
    ];
    const { action } = await inquirer.prompt(promptQuestion);
    const selected = this.inquirerChoices.find(item => item.choice === action);
    if(selected){
        selected.disabled = true;
        selected.action();
    }

    this.inquirerPrompt(); // Repeat the prompt in a loop
    }
}