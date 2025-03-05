/*TODO:
- integration, rt streaming
- map fixing
- homepage ui addition
- loading state of overview
- disable enable ai voicegen
 */
import { Link } from '@remix-run/react';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, User, Atom, File, ChevronLeft } from 'lucide-react';
import AnimatedBackground from '~/components/UI/AnimatedBackground';
import GlassContainer from '~/components/UI/GlassContainer';
import { motion } from 'framer-motion';
import ClientNavigationButtons from '~/components/Homepage/ClientNavigationButtons';

const BuildingSilhouettes = () => {
	// Function to generate random building paths
	const generateRandomStructurePath = (numStructures) => {
	  let path = '';
	  let x = 0;
	  for (let i = 0; i < numStructures; i++) {
		const width = 10 + Math.random() * 30; // Random width (narrower buildings)
		const height = 50 + Math.random() * 150; // Random height (shorter buildings)
		const structureType = Math.floor(Math.random() * 3); // Randomly choose a structure type
  
		switch (structureType) {
		  case 0: // Simple skyscraper
			path += `M${x} 300V${300 - height}h${width}v${height}H${x} `;
			break;
		  case 1: // House with a triangular roof
			path += `M${x} 300V${300 - height}h${width}v${height}H${x} `;
			path += `M${x} ${300 - height}l${width / 2} ${-height / 3}l${width / 2} ${height / 3}V${300}H${x} `;
			break;
		  case 2: // Dome-shaped structure
			path += `M${x} 300V${300 - height / 2}h${width}v${height / 2}H${x} `;
			path += `M${x} ${300 - height / 2}a${width / 2} ${height / 4} 0 0 1 ${width} 0V${300}H${x} `;
			break;
		  default:
			break;
		}
		x += width + (Math.random() * 20); // Random spacing between structures
	  }
	  return path;
	};
  
	// Function to generate a random silhouette SVG
	const RandomSilhouette = ({ left, height, opacity }) => {
	  const path = generateRandomStructurePath(2 + Math.floor(Math.random() * 3)); // Random number of structures
	  return (
		<svg
		  viewBox="0 0 400 300"
		  className="absolute pointer-events-none"
		  style={{ left: `${left}%`, bottom: '0', height: `${height}%`, opacity, filter: 'blur(1px)' }}
		>
		  <path d={path} fill="currentColor" className="text-purple-900" />
		</svg>
	  );
	};
  
	return (
	  <div className="absolute inset-0 pointer-events-none z-0">
		{/* Generate 40 random silhouettes */}
		{Array.from({ length: 40 }).map((_, i) => (
		  <RandomSilhouette
			key={i}
			left={Math.random() * 100} // Random horizontal position
			height={10 + Math.random() * 20} // Random height (shorter buildings)
			opacity={0.05 + Math.random() * 0.1} // Random opacity (more subtle)
		  />
		))}
	  </div>
	);
  };
  
const Chat = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [fileContent, setFileContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSearchQuery(file.name); 
			
			// const extractedText = await extractFileData(file);
			// if (extractedText) { // Check if extraction was successful
			// 	setFileContent(extractedText);
			// 	console.log("Extracted Data:", extractedText);
			// } else {
			// 		setFileContent("Error processing file"); // Handle error
			// }
		}
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom()
	}, [messages]);


	// const constructPrompt = (query: string) => {
	// 	return `You are a helpful AI assistant that helps the user who is a founder  with business related tasks like market research and pitch deck creation and analysis. Respond to the user's query in under 50 words, if there is a document attatched assume the info in it to be something related to business and respond as if u have know the info in the document. DO NOT under any circumstances include the name of the document in your response or make it look like you are'nt aware of the contents of attatched file, the user runs a streetware fashion brand so answer accordingly: "${query}"`;
	// };

	// const makeApiCall = async (query: string) => {
	// 	try {
	// 		const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
	// 			method: "POST",
	// 			headers: {
	// 				"Accept": "application/json",
	// 				"Content-Type": "application/json",
	// 				"Authorization": `Bearer fw_3ZiSSnWzBTmLi3NfDCMDbZAG`
	// 			},
	// 			body: JSON.stringify({
	// 				model: "accounts/fireworks/models/deepseek-v3",
	// 				max_tokens: 4096,
	// 				top_p: 1,
	// 				top_k: 40,
	// 				presence_penalty: 0,
	// 				frequency_penalty: 0,
	// 				temperature: 0.7,
	// 				messages: [
	// 					...messages,
	// 					{
	// 						role: "user",
	// 						content: constructPrompt(query)
	// 					}
	// 				]
	// 			})
	// 		});

	// 		const data = await response.json();
	// 		const textResponse = data.choices[0].message.content;

	// 		return textResponse;
	// 	} catch (error) {
	// 		console.error('API Error:', error);
	// 		throw error;
	// 	}
	// };

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (searchQuery.trim()) {
	// 		setIsLoading(true);

	// 		// Add user message to the messages array
	// 		setMessages(prevMessages => [...prevMessages, { role: 'user', content: searchQuery }]);

	// 		try {
	// 			const result = await makeApiCall(searchQuery);

	// 			// Add AI response to the messages array
	// 			setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: result }]);
	// 		} catch (error) {
	// 			console.error("Error fetching AI response:", error);
	// 			// Optionally add an error message to the chat
	// 			setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
	// 		} finally {
	// 			setIsLoading(false);
	// 			setSearchQuery(''); // Clear the input after sending
	// 		}
	// 	}
	// };
	return (
		<AnimatedBackground className="min-h-screen flex items-center justify-center">
			<BuildingSilhouettes/>
				<div className="p-6">
					<h1 className="text-4xl font-semibold mb-2 text-center font-subheading text-grey">
						MasterBroker.AI 
					</h1>
					<h3 className='text-lg font-subheading mb-8 text-center text-grey/50'>Automate your whole process of Real Estate Broking, with AI</h3>
					{/* Chat content will go here */}
					<div className="flex flex-col h-full">
						

			{/* Buttons */}
      <ClientNavigationButtons/>
					</div>
				</div>
</AnimatedBackground>
	);
};

export default Chat;
