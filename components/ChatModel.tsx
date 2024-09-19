/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ChatBot from 'react-simple-chatbot';
import React from 'react';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  interface SaveAnswerProps {
    previousStep: { value: string };
    triggerNextStep: () => void;
    field: string;
    onSave: (field: string, value: string) => void;
  }
  const handleNextStep = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && position) {
      setStep(3);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);

      // Set step to 4 to proceed to the chatbot interface
      setStep(4);
    }
  };
  const [userResponses, setUserResponses] = useState({
    experience: '',
    tools: '',
    project: '',
  });

  const SaveAnswer: React.FC<SaveAnswerProps> = ({
    previousStep,
    triggerNextStep,
    field,
    onSave,
  }) => {
    const value = previousStep?.value || '';

    // Save the value and trigger the next step
    React.useEffect(() => {
      if (value) {
        onSave(field, value);
        setTimeout(() => {
          triggerNextStep(); // Delay the next step slightly to avoid potential double-trigger
        }, 0); // Ensures the next step is triggered only once
      }
    }, [value, field, onSave, triggerNextStep]);

    return null; // No need to render anything
  };

  const [answers, setAnswers] = useState({
    experience: '',
    tools: '',
    project: '',
    dataCleaning: '',
    problemSolving: '',
    dataVisualization: '',
    accuracy: '',
    dataModeling: '',
    industryTrends: '',
  });

  const handleSave = (field: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const chatSteps2 = [
    {
      id: '1',
      message: 'What is your total experience as a Graphics Designer?',
      trigger: 'userExperience',
    },
    {
      id: 'userExperience',
      user: true,
      trigger: 'saveExperience',
    },
    {
      id: 'saveExperience',
      component: (
        <SaveAnswer
          field="experience"
          previousStep={{ value: 'userExperience' }} // Use dynamic value passed from chatbot
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true, // Wait for this step to complete before moving on
      trigger: '2',
    },
    {
      id: '2',
      message:
        'What design tools and software are you proficient in (e.g., Adobe Illustrator, Photoshop, Sketch)?',
      trigger: 'userTools',
    },
    {
      id: 'userTools',
      user: true,
      trigger: 'saveTools',
    },
    {
      id: 'saveTools',
      component: (
        <SaveAnswer
          field="tools"
          previousStep={{ value: 'userTools' }} // Dynamic value
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true, // Wait for this step to complete
      trigger: '3',
    },
    {
      id: '3',
      message:
        'Can you describe a major project you worked on that involved complex design challenges?',
      trigger: 'userProject',
    },
    {
      id: 'userProject',
      user: true,
      trigger: 'saveProject',
    },
    {
      id: 'saveProject',
      component: (
        <SaveAnswer
          field="project"
          previousStep={{ value: 'userProject' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true, // Wait for this step to complete
      trigger: '4',
    },
    {
      id: '4',
      message:
        'How do you approach a new design project from concept to completion?',
      trigger: 'userDesignProcess',
    },
    {
      id: 'userDesignProcess',
      user: true,
      trigger: 'saveDesignProcess',
    },
    {
      id: 'saveDesignProcess',
      component: (
        <SaveAnswer
          field="designProcess"
          previousStep={{ value: 'userDesignProcess' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '5',
    },
    {
      id: '5',
      message:
        'Can you provide examples of how you’ve used design principles to solve a client’s problem?',
      trigger: 'userDesignPrinciples',
    },
    {
      id: 'userDesignPrinciples',
      user: true,
      trigger: 'saveDesignPrinciples',
    },
    {
      id: 'saveDesignPrinciples',
      component: (
        <SaveAnswer
          field="designPrinciples"
          previousStep={{ value: 'userDesignPrinciples' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '6',
    },
    {
      id: '6',
      message:
        'How do you stay updated with current design trends and technologies?',
      trigger: 'userDesignTrends',
    },
    {
      id: 'userDesignTrends',
      user: true,
      trigger: 'saveDesignTrends',
    },
    {
      id: 'saveDesignTrends',
      component: (
        <SaveAnswer
          field="designTrends"
          previousStep={{ value: 'userDesignTrends' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '7',
    },
    {
      id: '7',
      message:
        'How do you handle feedback and revisions during the design process?',
      trigger: 'userFeedback',
    },
    {
      id: 'userFeedback',
      user: true,
      trigger: 'saveFeedback',
    },
    {
      id: 'saveFeedback',
      component: (
        <SaveAnswer
          field="feedback"
          previousStep={{ value: 'userFeedback' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '8',
    },
    {
      id: '8',
      message:
        'What strategies do you use to ensure your designs are both innovative and user-friendly?',
      trigger: 'userStrategies',
    },
    {
      id: 'userStrategies',
      user: true,
      trigger: 'saveStrategies',
    },
    {
      id: 'saveStrategies',
      component: (
        <SaveAnswer
          field="strategies"
          previousStep={{ value: 'userStrategies' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '9',
    },
    {
      id: '9',
      message:
        'Can you discuss a time when you had to balance multiple design projects simultaneously?',
      trigger: 'userProjectManagement',
    },
    {
      id: 'userProjectManagement',
      user: true,
      trigger: 'saveProjectManagement',
    },
    {
      id: 'saveProjectManagement',
      component: (
        <SaveAnswer
          field="projectManagement"
          previousStep={{ value: 'userProjectManagement' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '10',
    },
    {
      id: '10',
      message:
        'Thank you for answering all the questions! We will review your responses and get back to you.',
      end: true,
    },
  ];

  const chatSteps = [
    {
      id: '1',
      message: `What is your total experience as a's Data Analyst?`,
      trigger: 'userExperience',
    },
    {
      id: 'userExperience',
      user: true,
      trigger: 'saveExperience',
    },
    {
      id: 'saveExperience',
      component: (
        <SaveAnswer
          field="experience"
          previousStep={{ value: 'userExperience' }} // Use dynamic value passed from chatbot
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true, // Wait for this step to complete before moving on
      trigger: '2',
    },
    {
      id: '2',
      message: 'Which tools are you proficient in (e.g., Excel, SQL, Python)?',
      trigger: 'userTools',
    },
    {
      id: 'userTools',
      user: true,
      trigger: 'saveTools',
    },
    {
      id: 'saveTools',
      component: (
        <SaveAnswer
          field="tools"
          previousStep={{ value: 'userTools' }} // Dynamic value
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true, // Wait for this step to complete
      trigger: '3',
    },
    {
      id: '3',
      message: 'Can you describe a major project you worked on?',
      trigger: 'userProject',
    },
    {
      id: 'userProject',
      user: true,
      trigger: 'saveProject',
    },
    {
      id: 'saveProject',
      component: (
        <SaveAnswer
          field="project"
          previousStep={{ value: 'userProject' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true, // Wait for this step to complete
      trigger: '4',
    },
    {
      id: '4',
      message: 'How do you handle data cleaning and preparation?',
      trigger: 'userDataCleaning',
    },
    {
      id: 'userDataCleaning',
      user: true,
      trigger: 'saveDataCleaning',
    },
    {
      id: 'saveDataCleaning',
      component: (
        <SaveAnswer
          field="dataCleaning"
          previousStep={{ value: 'userDataCleaning' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '5',
    },
    {
      id: '5',
      message:
        'Can you describe a challenging problem you solved in your previous job?',
      trigger: 'userProblemSolving',
    },
    {
      id: 'userProblemSolving',
      user: true,
      trigger: 'saveProblemSolving',
    },
    {
      id: 'saveProblemSolving',
      component: (
        <SaveAnswer
          field="problemSolving"
          previousStep={{ value: 'userProblemSolving' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '6',
    },
    {
      id: '6',
      message: 'What strategies do you use for effective data visualization?',
      trigger: 'userDataVisualization',
    },
    {
      id: 'userDataVisualization',
      user: true,
      trigger: 'saveDataVisualization',
    },
    {
      id: 'saveDataVisualization',
      component: (
        <SaveAnswer
          field="dataVisualization"
          previousStep={{ value: 'userDataVisualization' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '7',
    },
    {
      id: '7',
      message: 'How do you ensure accuracy and integrity in your analyses?',
      trigger: 'userAccuracy',
    },
    {
      id: 'userAccuracy',
      user: true,
      trigger: 'saveAccuracy',
    },
    {
      id: 'saveAccuracy',
      component: (
        <SaveAnswer
          field="accuracy"
          previousStep={{ value: 'userAccuracy' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '8',
    },
    {
      id: '8',
      message:
        'What is your experience with data modeling and statistical analysis?',
      trigger: 'userDataModeling',
    },
    {
      id: 'userDataModeling',
      user: true,
      trigger: 'saveDataModeling',
    },
    {
      id: 'saveDataModeling',
      component: (
        <SaveAnswer
          field="dataModeling"
          previousStep={{ value: 'userDataModeling' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '9',
    },
    {
      id: '9',
      message:
        'How do you stay updated with the latest industry trends and technologies?',
      trigger: 'userIndustryTrends',
    },
    {
      id: 'userIndustryTrends',
      user: true,
      trigger: 'saveIndustryTrends',
    },
    {
      id: 'saveIndustryTrends',
      component: (
        <SaveAnswer
          field="industryTrends"
          previousStep={{ value: 'userIndustryTrends' }}
          onSave={handleSave}
          triggerNextStep={() => {}}
        />
      ),
      asMessage: true,
      waitAction: true,
      trigger: '10',
    },
    {
      id: '10',
      message:
        'Thank you for answering all the questions! We will review your responses and get back to you.',
      end: true,
    },
  ];

  return (
    <div>
      {/* Apply with AI button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white px-4 py-2 rounded-lg shadow-md transition bg-black"
      >
        <Image
          className="object-contain"
          src="/logo.png"
          alt="Vercel Logo"
          width={300}
          height={300}
        />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg shadow-lg max-w-lg w-full items-center justify-center flex">
            {step === 1 && (
              <div className="relative">
                <Image
                  className="object-contain"
                  src="/name.jpg"
                  alt="Vercel Logo"
                  width={300}
                  height={300}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What is Your Name?"
                  className="p-2 rounded w-72 mb-4 absolute bottom-[10%] left-2 focus:border-none text-black"
                />
                <button
                  onClick={handleNextStep}
                  className={`bg-blue-500 text-white px-4 py-2 rounded absolute bottom-[5%] left-2 ${
                    !name.trim()
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } transition`}
                  disabled={!name.trim()}
                >
                  Chat
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="relative bg-gradient-to-l from-[#5CDFE6] to-[#8C53FF] p-10 text-white h-[60vh] text-xl font-medium ">
                <h2 className="text-2xl font-semibold mb-4 capitalize">
                  Welcome, {name}!
                </h2>
                <p className="mb-4 ">
                  Please select the position you are applying for:
                </p>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="position"
                      value="Data Analyst"
                      checked={position === 'Data Analyst'}
                      onChange={() => setPosition('Data Analyst')}
                      className="mr-2"
                    />
                    Data Analyst
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="position"
                      value="Graphics Designer"
                      checked={position === 'Graphics Designer'}
                      onChange={() => setPosition('Graphics Designer')}
                      className="mr-2"
                    />
                    Graphics Designer
                  </label>
                </div>
                <button
                  onClick={handleNextStep}
                  className={`bg-blue-500 text-white px-4 py-2 rounded mt-10 ${
                    !position
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } transition`}
                  disabled={!position}
                >
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="relative items-center justify-center flex flex-col">
                <Image
                  className="object-contain"
                  src="/ucv2.png"
                  alt="Vercel Logo"
                  width={300}
                  height={300}
                />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="border border-gray-300 p-2 rounded w-full mb-4 absolute top-[47%] opacity-0 cursor-pointer"
                />
                {/* <button
                  onClick={() => {
                    setStep(4); // Go to the chatbot step
                  }}
                  //   onClick={() => setIsOpen(false)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                  Done
                </button> */}
              </div>
            )}
            {step === 4 && (
              <div className="text-black">
                {position === 'Data Analyst' ? (
                  <ChatBot steps={chatSteps} />
                ) : (
                  <ChatBot steps={chatSteps2} />
                )}
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="text-red-500  absolute top-[14%] right-[43%]  cursor-pointer h-16 opacity-0"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
