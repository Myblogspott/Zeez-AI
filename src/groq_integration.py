import openai
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
import os

# Set up OpenAI API key (make sure to have the environment variable OPENAI_API_KEY set)
openai.api_key = os.getenv("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")
MODEL = 'gpt-3.5-turbo'

def create_langchain_quiz_chain():
    """Sets up a LangChain quiz chain."""
    # Create a LangChain Prompt Template
    prompt_template = """
    You are a quiz master. Generate a {difficulty} multiple-choice quiz question for grade {grade} students about {topic}.
    Provide 4 options, the correct answer, and an explanation.
    """

    # Use LangChain's PromptTemplate to create a template
    template = PromptTemplate(input_variables=["difficulty", "grade", "topic"], template=prompt_template)
    load_dotenv()
    # Use OpenAI as the LLM
    llm = OpenAI(temperature=0.7, openai_api_key=os.getenv("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"))

    # Create the LLMChain (which might be still available in your version)
    quiz_chain = LLMChain(llm=llm, prompt=template)
    return quiz_chain

def get_quiz_questions(topic, grade, difficulty, num_questions):
    """Fetch multiple quiz questions based on topic, grade, difficulty, and number of questions."""
    quiz_chain = create_langchain_quiz_chain()
    questions = []
    
    for _ in range(num_questions):
        try:
            # Pass the parameters into the LangChain chain and generate the quiz data
            quiz_data = quiz_chain.run({
                "topic": topic,
                "grade": grade,
                "difficulty": difficulty
            })
            print(f"Quiz Chain Response: {quiz_data}")
            
            # Process the response into a structured format
            question = process_quiz_response(quiz_data)
            if question:
                questions.append(question)
        except Exception as e:
            print(f"Error generating question: {str(e)}")
    
    return questions

def process_quiz_response(quiz_response_content):
    """Helper function to process OpenAI or LangChain quiz response content."""
    try:
        # Extracting question, options, correct answer, and explanation
        question, *options_and_answer = quiz_response_content.split('\n')
        correct_answer_line = [line for line in options_and_answer if "Correct answer" in line]
        explanation_line = [line for line in options_and_answer if "Explanation" in line]

        options = [line.strip() for line in options_and_answer if line.startswith("A") or line.startswith("B") or line.startswith("C") or line.startswith("D")]

        correct_answer = correct_answer_line[0].split(":")[1].strip() if correct_answer_line else "No answer provided"
        explanation = explanation_line[0] if explanation_line else "No explanation provided."

        return {
            'question': question.strip(),
            'options': options,
            'correct_answer': correct_answer,
            'explanation': explanation
        }
    except Exception as e:
        print(f"Error processing quiz response: {str(e)}")
        return None

def run_quiz():
    """Run the quiz by asking the user for the topic, grade, difficulty, and number of questions."""
    # Step 1: Collect user inputs
    topic = input("Enter the topic for the quiz: ")
    grade = input("Enter the grade level (e.g., 5, 6, 7, etc.): ")
    difficulty = input("Enter difficulty level (easy, medium, hard): ")
    
    # Limit the number of questions to either 15, 30, or 45
    while True:
        try:
            num_questions = int(input("How many questions do you want? (Choose 15, 30, or 45): "))
            if num_questions in [15, 30, 45]:
                break
            else:
                print("Please choose either 15, 30, or 45 questions.")
        except ValueError:
            print("Please enter a valid number (15, 30, or 45).")

    # Step 2: Generate questions
    quiz = get_quiz_questions(topic, grade, difficulty, num_questions)
    
    # Step 3: Display questions without the correct answer and get user input for answers
    for idx, question_data in enumerate(quiz, start=1):
        print(f"\nQuestion {idx}: {question_data['question']}")
        for option in question_data['options']:
            print(option)

        # Step 4: Collect the user's answer with validation
        while True:
            user_answer = input("Enter your answer (A, B, C, or D): ").strip().upper()
            if user_answer in ['A', 'B', 'C', 'D']:
                break
            else:
                print("Invalid input. Please enter A, B, C, or D.")

        # Step 5: Check if the answer is correct and show feedback
        correct_answer_letter = question_data['correct_answer'][0].upper()  # Get the first letter of the correct answer
        if user_answer == correct_answer_letter:
            print("Correct!")
        else:
            print(f"Wrong! The correct answer is {question_data['correct_answer']}.")

        # Step 6: Show explanation for both correct and wrong answers
        print(f"\nExplanation: {question_data['explanation']}\n")


# Example usage to run the quiz
if __name__ == "__main__":
    run_quiz()
