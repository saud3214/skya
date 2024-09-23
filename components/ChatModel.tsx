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
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);

  interface SaveAnswerProps {
    previousStep: { value: string };
    triggerNextStep: () => void;
    field: string;
    onSave: (field: string, value: string) => void;
  }

  interface UploadedData {
    Name: string;
    Education: string[];
    Skills: string[];
    Certificates?: string;
    Contact_Details: {
      Location: string;
      Phone: string;
      Email: string;
    };
    Projects: string[];
  }
  const handleNextStep = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && position) {
      setStep(3);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://deploy.wolfiz.org/skya/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UploadedData = await response.json();
        console.log('File uploaded successfully:', data);
        setUploadedData(data);

        setStep(4);
        // Set step to 4 to proceed to the chatbot interface
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('There was an issue uploading the file. Please try again.');
      }
    }
  };
  const resetState = () => {
    setIsOpen(false);
    setStep(1);
    setName('');
    setPosition('');
    setUploadedData(null);
  };
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
      message: 'Thank you for answering all the questions!',
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
          width={200}
          height={200}
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
                  className={`bg-blue-500 text-white px-4 py-2 rounded absolute bottom-[4%] left-[40%] ${
                    !name.trim()
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  } transition`}
                  disabled={!name.trim()}
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="relative bg-gradient-to-l from-[#5CDFE6] to-[#8C53FF] p-10 w-10/12 text-white h-[60vh] text-xl font-medium rounded-3xl ">
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
                  className="border border-gray-300 p-2 rounded w-full mb-4 absolute top-[47%] h-24 opacity-0 cursor-pointer"
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
            {step === 4 && uploadedData && (
              <div className="relative bg-gradient-to-l from-[#5CDFE6] to-[#8C53FF] p-10 text-white  text-xl font-medium rounded-3xl w-10/12">
                <h2 className="text-2xl mb-4">
                  Please conform Following data :
                </h2>

                <div>
                  <div>
                    <strong>Name:</strong> {uploadedData.Name}
                  </div>

                  <div className="flex flex-col">
                    <strong>Education:</strong>
                    {Array.isArray(uploadedData.Education)
                      ? uploadedData.Education.join(', ')
                      : uploadedData.Education}
                  </div>

                  <div className="flex flex-col ">
                    <strong>Skills:</strong> {uploadedData.Skills.join(', ')}
                  </div>

                  {uploadedData.Certificates && (
                    <div>
                      <strong>Certificates:</strong> {uploadedData.Certificates}
                    </div>
                  )}

                  <div>
                    <strong>Contact Details:</strong>
                    <div>Location: {uploadedData.Contact_Details.Location}</div>
                    <div>Phone: {uploadedData.Contact_Details.Phone}</div>
                    <div>Email: {uploadedData.Contact_Details.Email}</div>
                  </div>

                  {/* <div>
                    <strong>Projects:</strong>{' '}
                    {uploadedData.Projects.join(', ')}
                  </div> */}
                </div>

                <button
                  className="text-white cursor-pointer h-16 border-2 border-[#8C53FF] px-4 py-2 rounded-lg shadow-md hover:bg-[#8C53FF] transition mt-5"
                  onClick={() => setStep(5)} // Corrected the missing parenthesis
                >
                  Confirm Data
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="text-black">
                {position === 'Data Analyst' ? (
                  <ChatBot
                    steps={chatSteps}
                    handleEnd={() => setStep(6)} // Pass a function reference
                  />
                ) : (
                  <ChatBot
                    steps={chatSteps2}
                    handleEnd={() => setStep(6)} // Pass a function reference
                  />
                )}
              </div>
            )}

            {step === 6 && (
              <div className="relative bg-gradient-to-l from-[#5CDFE6] to-[#8C53FF] p-10 text-white h-[60vh] text-2xl flex flex-col font-medium  items-center justify-center gap-5 text-center rounded-3xl w-10/12">
                Thank You We Will Get Back To You Soon.
                <button
                  onClick={resetState}
                  className="text-white cursor-pointer h-16 border-2 border-[#8C53FF] px-4 py-2 rounded-lg shadow-md hover:bg-[#8C53FF] transition mt-5"
                >
                  Close
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="text-white cursor-pointer h-16 border-2 border-[#8C53FF] px-4 py-2 rounded-lg shadow-md hover:bg-[#8C53FF] transition"
                >
                  Apply for Another Position
                </button>
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
