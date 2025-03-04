import { Link } from '@remix-run/react';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, User, Atom, File, ChevronLeft } from 'lucide-react';
import AnimatedBackground from '~/components/UI/AnimatedBackground';
import GlassContainer from '~/components/UI/GlassContainer';
import { motion } from 'framer-motion';
import ClientNavigationButtons from '~/components/Homepage/ClientNavigationButtons';

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


	const constructPrompt = (query: string) => {
		return `You are a helpful AI assistant that helps the user who is a founder  with business related tasks like market research and pitch deck creation and analysis. Respond to the user's query in under 50 words, if there is a document attatched assume the info in it to be something related to business and respond as if u have know the info in the document. DO NOT under any circumstances include the name of the document in your response or make it look like you are'nt aware of the contents of attatched file, the user runs a streetware fashion brand so answer accordingly: "${query}"`;
	};

	const makeApiCall = async (query: string) => {
		try {
			const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer fw_3ZiSSnWzBTmLi3NfDCMDbZAG`
				},
				body: JSON.stringify({
					model: "accounts/fireworks/models/deepseek-v3",
					max_tokens: 4096,
					top_p: 1,
					top_k: 40,
					presence_penalty: 0,
					frequency_penalty: 0,
					temperature: 0.7,
					messages: [
						...messages,
						{
							role: "user",
							content: constructPrompt(query)
						}
					]
				})
			});

			const data = await response.json();
			const textResponse = data.choices[0].message.content;

			return textResponse;
		} catch (error) {
			console.error('API Error:', error);
			throw error;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			setIsLoading(true);

			// Add user message to the messages array
			setMessages(prevMessages => [...prevMessages, { role: 'user', content: searchQuery }]);

			try {
				const result = await makeApiCall(searchQuery);

				// Add AI response to the messages array
				setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: result }]);
			} catch (error) {
				console.error("Error fetching AI response:", error);
				// Optionally add an error message to the chat
				setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
			} finally {
				setIsLoading(false);
				setSearchQuery(''); // Clear the input after sending
			}
		}
	};
	return (
		<AnimatedBackground className="min-h-screen flex items-center justify-center">
				<div className="p-6">
					<h1 className="text-4xl font-semibold mb-2 text-center font-subheading text-grey">
						MasterBroker.AI 
					</h1>
					<h3 className='text-lg font-subheading mb-8 text-center text-grey/50'>Automate your whole process of Real Estate Broking, with AI</h3>
					{/* Chat content will go here */}
					<div className="flex flex-col h-full">
						{/* Message Display Area */}
						<div className="flex-grow overflow-y-auto">
							{messages.map((message, index) => (
								<div
									key={index}
									className={`
										flex
										items-start
										mb-4
										${message.role === 'user' ? 'justify-start' : 'justify-end'}
									`}
								>
									{message.role === 'user' && <User className="w-6 h-6 text-grey mr-2 mt-1" />}
									<motion.div
										className={`
											max-w-[60%]
											p-4
											rounded-xl
											${
												message.role === 'user'
													? 'bg-white/10 border border-white/20 text-grey font-subheading'
													: 'bg-gradient-to-r from-portage to-portage/70 border border-portage/50 text-grey font-subheading'
											}
										`}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										{message.content}
									</motion.div>
									{message.role === 'assistant' && <Atom className="w-6 h-6 text-portage ml-2 mt-1" />}
								</div>
							))}
							{isLoading && (
								<div className="flex justify-end mb-4">
									<div className="max-w-[60%] p-4 rounded-xl bg-gradient-to-r from-portage to-portage/70 border border-portage/50 text-grey flex items-center">
										<Loader className="animate-spin mr-2" /> Typing...
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

			{/* Buttons */}
      <ClientNavigationButtons/>
					</div>
				</div>
</AnimatedBackground>
	);
};

export default Chat;
