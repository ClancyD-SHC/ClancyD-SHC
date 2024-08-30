import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { MessageSquare, Lightbulb, Stethoscope, School, ArrowLeft, Upload, FileText } from 'lucide-react';

const coachingTopics = [
  {
    id: 1,
    title: "AI for Innovative Ideas",
    description: "Learn how to instruct AI to generate innovative ideas for work processes or products.",
    icon: <Lightbulb className="h-6 w-6" />,
    prompts: [
      {
        text: "Instruct the AI to brainstorm three innovative ideas for integrating AI into our customer service process. Try giving some areas for it to focus on.",
        requiresUpload: false,
      },
      {
        text: "Ask the AI to analyze our current product development process. Identify three key bottlenecks or inefficiencies, then suggest AI-powered solutions for each. For each solution, explain how it would work and the potential impact on time-to-market and product quality.",
        requiresUpload: true,
      },
      {
        text: "Guide the AI to evaluate the feasibility of implementing an AI-powered predictive maintenance system in our manufacturing plant. Consider technical requirements, potential ROI, implementation challenges, and timeline. Provide a pros and cons list and a final recommendation.",
        requiresUpload: true,
      }
    ],
    examplePrompts: [
      "Generate three innovative ideas for integrating AI into our customer service process. Focus on improving response times, personalizing interactions, and predicting customer needs. For each idea, provide a brief description and potential benefits.",
      "Analyze our current product development process. Identify three bottlenecks or inefficiencies, then suggest AI-powered solutions for each. For each solution, explain how it would work and the potential impact on time-to-market and product quality.",
      "Evaluate the feasibility of implementing an AI-powered predictive maintenance system in our manufacturing plant. Consider technical requirements, potential ROI, implementation challenges, and timeline. Provide a pros and cons list and a final recommendation."
    ]
  },
  {
    id: 2,
    title: "AI on Healthcare Developments",
    description: "Discover how to instruct AI to summarize recent developments in healthcare AI.",
    icon: <Stethoscope className="h-6 w-6" />,
    prompts: [
      {
        text: "Direct the AI to identify the top 3 breakthrough AI technologies in healthcare from the past year. For each, provide a brief description, its potential impact on patient care, and any challenges to widespread adoption. Focus on technologies that have shown promising results in clinical trials or real-world applications.",
        requiresUpload: false,
      },
      {
        text: "Instruct the AI to summarize the current top 5 research areas in healthcare AI. For each area, provide: 1) A brief description of the focus, 2) Key institutions or companies leading the research, 3) Recent significant findings or breakthroughs, and 4) Potential near-future applications in clinical settings.",
        requiresUpload: false,
      },
      {
        text: "Ask the AI to identify 3 emerging AI applications in healthcare that are still in early stages but show significant promise. For each application, describe: 1) The specific healthcare problem it addresses, 2) How the AI solution works, 3) Current stage of development (e.g., research, pilot testing, early adoption), and 4) Potential impact on healthcare delivery or patient outcomes.",
        requiresUpload: false,
      }
    ],
    examplePrompts: [
      "Identify the top 3 breakthrough AI technologies in healthcare from the past year. For each, provide a brief description, its potential impact on patient care, and any challenges to widespread adoption. Focus on technologies that have shown promising results in clinical trials or real-world applications.",
      "Summarize the current top 5 research areas in healthcare AI. For each area, provide: 1) A brief description of the focus, 2) Key institutions or companies leading the research, 3) Recent significant findings or breakthroughs, and 4) Potential near-future applications in clinical settings.",
      "Identify 3 emerging AI applications in healthcare that are still in early stages but show significant promise. For each application, describe: 1) The specific healthcare problem it addresses, 2) How the AI solution works, 3) Current stage of development (e.g., research, pilot testing, early adoption), and 4) Potential impact on healthcare delivery or patient outcomes."
    ]
  },
  {
    id: 3,
    title: "AI for Strategy Articulation",
    description: "Learn to instruct AI in articulating complex strategies like Stanford Medicine's AI vision.",
    icon: <School className="h-6 w-6" />,
    prompts: [
      {
        text: "Guide the AI to analyze Stanford Medicine's public statements, research focus, and partnerships to identify the top 5 key objectives of their AI strategy. For each objective, provide: 1) A concise description, 2) How it aligns with broader healthcare trends, 3) Potential challenges in achieving this objective, and 4) Examples of current initiatives or projects supporting this objective.",
        requiresUpload: true,
      },
      {
        text: "Ask the AI to examine Stanford Medicine's AI initiatives, research publications, and collaborations to identify their top 3 technological focus areas in AI. For each area, provide: 1) A brief description of the technology, 2) Why it's strategic for Stanford Medicine, 3) Key projects or applications within this focus area, and 4) How it compares to focus areas of other leading medical institutions.",
        requiresUpload: true,
      },
      {
        text: "Instruct the AI to project the expected outcomes of Stanford Medicine's AI efforts over the next 5 years, based on their stated AI strategy and current initiatives. Include: 1) Potential breakthroughs in research or clinical care, 2) Expected improvements in patient outcomes or operational efficiency, 3) Possible new AI-driven services or products, and 4) Anticipated challenges or ethical considerations. Provide specific, quantifiable metrics where possible.",
        requiresUpload: true,
      }
    ],
    examplePrompts: [
      "Analyze Stanford Medicine's public statements, research focus, and partnerships to identify the top 5 key objectives of their AI strategy. For each objective, provide: 1) A concise description, 2) How it aligns with broader healthcare trends, 3) Potential challenges in achieving this objective, and 4) Examples of current initiatives or projects supporting this objective.",
      "Examine Stanford Medicine's AI initiatives, research publications, and collaborations to identify their top 3 technological focus areas in AI. For each area, provide: 1) A brief description of the technology, 2) Why it's strategic for Stanford Medicine, 3) Key projects or applications within this focus area, and 4) How it compares to focus areas of other leading medical institutions.",
      "Project the expected outcomes of Stanford Medicine's AI efforts over the next 5 years, based on their stated AI strategy and current initiatives. Include: 1) Potential breakthroughs in research or clinical care, 2) Expected improvements in patient outcomes or operational efficiency, 3) Possible new AI-driven services or products, and 4) Anticipated challenges or ethical considerations. Provide specific, quantifiable metrics where possible."
    ]
  }
];

const SHCarizard = () => {
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleTopicSelect = (topic) => {
    setCurrentTopic(topic);
    setCurrentPrompt(0);
    setConversation([]);
    setUploadedFile(null);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim() === '') return;

    const newConversation = [...conversation, { role: 'user', content: userInput }];
    setConversation(newConversation);
    setUserInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(currentTopic.id, currentPrompt);
      const updatedConversation = [...newConversation, { role: 'ai', content: aiResponse }];
      setConversation(updatedConversation);

      // Progress to the next prompt
      if (currentPrompt < currentTopic.prompts.length - 1) {
        setCurrentPrompt(prevPrompt => prevPrompt + 1);
      } else {
        // If all prompts are completed, you might want to handle this case
        // For example, show a completion message or reset to the topic selection
        handleBackToTopics();
      }
    }, 1000);
  };

  const handleTryAgain = () => {
    setConversation([]);
    setUploadedFile(null);
    setCurrentPrompt(0);  // Reset to the first prompt
  };

  const handleBackToTopics = () => {
    setCurrentTopic(null);
    setCurrentPrompt(0);
    setConversation([]);
    setUploadedFile(null);
  };

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFile({
      name: "uploaded_document.pdf",
      size: "2.4 MB",
      type: "application/pdf"
    });
  };

  const getAIResponse = (topicId, promptIndex) => {
    const responses = {
      1: [
        "Great approach! To enhance your prompt, consider specifying the work process and desired outcomes. For example: 'Generate three innovative ideas for integrating AI into our customer service process. Focus on improving response times, personalizing interactions, and predicting customer needs. For each idea, provide a brief description and potential benefits.'",
        "Good start! To get more detailed insights, try structuring your prompt like this: 'Analyze our current product development process. Identify three bottlenecks or inefficiencies, then suggest AI-powered solutions for each. For each solution, explain how it would work and the potential impact on time-to-market and product quality.'",
        "Excellent! To get a comprehensive evaluation, frame your prompt like this: 'Evaluate the feasibility of implementing an AI-powered predictive maintenance system in our manufacturing plant. Consider technical requirements, potential ROI, implementation challenges, and timeline. Provide a pros and cons list and a final recommendation.'"
      ],
      2: [
        "Good approach! To get more specific results, try a prompt like this: 'Identify the top 3 breakthrough AI technologies in healthcare from the past year. For each, provide a brief description, its potential impact on patient care, and any challenges to widespread adoption. Focus on technologies that have shown promising results in clinical trials or real-world applications.'",
        "Nice start! To get a more structured summary, you could use a prompt like: 'Summarize the current top 5 research areas in healthcare AI. For each area, provide: 1) A brief description of the focus, 2) Key institutions or companies leading the research, 3) Recent significant findings or breakthroughs, and 4) Potential near-future applications in clinical settings.'",
        "Good thinking! To spot emerging applications effectively, try framing your query like this: 'Identify 3 emerging AI applications in healthcare that are still in early stages but show significant promise. For each application, describe: 1) The specific healthcare problem it addresses, 2) How the AI solution works, 3) Current stage of development (e.g., research, pilot testing, early adoption), and 4) Potential impact on healthcare delivery or patient outcomes.'"
      ],
      3: [
        "Great start! To get a comprehensive overview, structure your prompt like this: 'Analyze Stanford Medicine's public statements, research focus, and partnerships to identify the top 5 key objectives of their AI strategy. For each objective, provide: 1) A concise description, 2) How it aligns with broader healthcare trends, 3) Potential challenges in achieving this objective, and 4) Examples of current initiatives or projects supporting this objective.'",
        "Good approach! To get a detailed analysis, use a prompt like: 'Examine Stanford Medicine's AI initiatives, research publications, and collaborations to identify their top 3 technological focus areas in AI. For each area, provide: 1) A brief description of the technology, 2) Why it's strategic for Stanford Medicine, 3) Key projects or applications within this focus area, and 4) How it compares to focus areas of other leading medical institutions.'",
        "Excellent direction! To get a well-rounded projection, frame your request like this: 'Based on Stanford Medicine's stated AI strategy and current initiatives, project the expected outcomes of their AI efforts over the next 5 years. Include: 1) Potential breakthroughs in research or clinical care, 2) Expected improvements in patient outcomes or operational efficiency, 3) Possible new AI-driven services or products, and 4) Anticipated challenges or ethical considerations. Provide specific, quantifiable metrics where possible.'"
      ]
    };
    return responses[topicId][promptIndex];
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Prompt Coach</h1>

      {!currentTopic ? (
        <div className="grid grid-cols-1 gap-4">
          {coachingTopics.map((topic) => (
            <Card key={topic.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleTopicSelect(topic)}>
              <CardHeader className="flex flex-row items-center space-x-2">
                {topic.icon}
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>{topic.description}</CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">{currentTopic.title}</h2>
          <p className="mb-4">{currentTopic.description}</p>
          <div className="mb-4">
            <p className="font-medium">Coaching Prompt ({currentPrompt + 1}/{currentTopic.prompts.length}):</p>
            <p>{currentTopic.prompts[currentPrompt].text}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Example Prompt:</p>
            <p className="italic">{currentTopic.examplePrompts[currentPrompt]}</p>
          </div>
          {currentTopic.prompts[currentPrompt].requiresUpload && (
            <div className="mb-4">
              <p className="font-medium">Required Document:</p>
              {uploadedFile ? (
                <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>{uploadedFile.name}</span>
                  <span className="text-sm text-gray-500">({uploadedFile.size})</span>
                </div>
              ) : (
                <Button onClick={handleFileUpload} className="mt-2">
                  <Upload className="mr-2 h-4 w-4" /> Upload Document
                </Button>
              )}
            </div>
          )}
          <div className="space-y-4">
            {conversation.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3/4 p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <Input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Type your AI instruction here..."
              className="flex-grow"
            />
            <Button onClick={handleSubmit} disabled={currentTopic.prompts[currentPrompt].requiresUpload && !uploadedFile}>
              <MessageSquare className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button onClick={handleTryAgain}>Try Again</Button>
            <Button onClick={handleBackToTopics}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <SHCarizard />
    </div>
  );
}