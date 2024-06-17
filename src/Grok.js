import Groq from "groq-sdk";
import { useEffect, useState } from "react";
import Resume2D from './Resume2D';
import Resume from "./resume/Resume";
const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: content,
      },
      {
        role: "system",
        content: "Create a <div> component using Tailwind based on the user's requirements(Summary, skills, Back-end, database, other ) and turn it into a CV according to the Software Engineer form (do not comment in this code and using className instead of class)"
      }
    ],
    model: "llama3-8b-8192",
  });
}

const Grok = () => {
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
useEffect(() => {

},[message])
  const getAnswer = async (e) => {
    e.preventDefault();
    try {
      const chatCompletion = await getGroqChatCompletion(content);
      console.log(chatCompletion.choices[0]?.message?.content);
      setMessage(chatCompletion.choices[0]?.message?.content || "");
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  function extractFirstDivContent(html) {
    const divRegex = /<div[^>]*>([\s\S]*?)<\/div>/i;
    const match = html.match(divRegex);
    return match ? match[0] : null;
}

function extractOuterDivContent(htmlString) {
    // Tìm vị trí của thẻ <div> đầu tiên
    const firstDivStart = htmlString.indexOf('<div');
    if (firstDivStart === -1) {
      return null; // Không tìm thấy thẻ <div>
    }
  
    // Tìm vị trí của thẻ </div> cuối cùng
    const lastDivEnd = htmlString.lastIndexOf('</div>');
    if (lastDivEnd === -1) {
      return null; // Không tìm thấy thẻ </div>
    }
  
    // Tìm vị trí kết thúc của thẻ <div> mở đầu ngoài cùng
    const firstDivEnd = htmlString.indexOf('>', firstDivStart) + 1;
  
    // Lấy nội dung giữa thẻ <div> mở đầu và thẻ </div> đóng ngoài cùng
    const innerContent = htmlString.slice(firstDivEnd, lastDivEnd);
  
    return innerContent;
  }

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={(e) => getAnswer(e)}>
        <div className="mb-5">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      {/* <p>Answer: {extractOuterDivContent(message)}</p> */}
      {/* <Resume data={extractFirstDivContent(message)}/> */}
      <Resume2D data={extractOuterDivContent(message)}/>
    </>
  );
};

export default Grok;
