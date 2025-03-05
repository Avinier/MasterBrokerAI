import { 
    json, 
    unstable_parseMultipartFormData, 
    unstable_createMemoryUploadHandler 
  } from "@remix-run/node";
  import { ActionFunction } from "@remix-run/node";
  
  export const action: ActionFunction = async ({ request }) => {
    // Add memory upload handler
    const formData = await unstable_parseMultipartFormData(
      request,
      unstable_createMemoryUploadHandler() // Add upload handler
    );
    const audioFile = formData.get("audio"); 
  
    if (!(audioFile instanceof File)) {
      return json({ error: "No valid audio file provided" }, { status: 400 });
    }
  
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
  
    // Send to Sarvam API
    const sarvamFormData = new FormData();
    sarvamFormData.append(
      "file",
      new Blob([audioBuffer], { type: "audio/wav" }),
      "audio.wav"
    );
  
    const sarvamResponse = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        "api-subscription-key": process.env.VITE_SARVAM_API_KEY || "",
      },
      body: sarvamFormData,
    });
  
    if (!sarvamResponse.ok) {
      return json({ error: "Failed to process audio with Sarvam API" }, { status: 500 });
    }
  
    const sarvamResult = await sarvamResponse.json();
    const transcription = sarvamResult.transcript;
  
    // Send transcription to Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an expert transcriber, translator, and language specialist, skilled at converting transcriptions from various languages (including Hindi, Marathi, Gujarati, Tamil, Telugu, and others) into clear, natural, and grammatically correct English. You handle a wide variety of transcription types, from verbatim speech to informal notes. You should prioritize accuracy and clarity, while also aiming to make the text flow smoothly and be easy to understand for a native English speaker. If the input is in English already, simply clean it as in the previous examples.
  
  Here are some examples of how to convert transcriptions (including translations) to clear English:
  
  **Example 1: Hindi to English**
  
  *   **Transcription (Hindi):** "तो, वो बोल रहा था कि, 'ये काम तो बहुत मुश्किल है, यार!'"
  *   **English:** "So, he was saying, 'This work is very difficult, man!'"
  
  **Example 2: Marathi to English**
  
  *   **Transcription (Marathi):** "मग ती म्हणाली, 'मला नाही जमत हे सगळं.'"
  *   **English:** "Then she said, 'I can't do all this.'"
  
  **Example 3: Mixed (Hindi/English)**
  
  *   **Transcription:** "वो बोल रहा था like, 'This is the final deadline, समझो!'"
  *   **English:** "He was saying something like, 'Consider this the final deadline!'"
  
  **Example 4: English with fillers**
  
  *   **Transcription:** "uh... so, like, the, um, project... it's, uh, gonna be done... maybe by, you know, Friday?"
  *   **English:** "The project will likely be completed by Friday."
  
  **Example 5: Code-Switching (Hindi/English)**
  
  *   **Transcription:** "Maine socha I'll just leave it there."
  *   **English:** "I thought I'd just leave it there."
  
  **Example 6: Tamil to English**
  
  *   **Transcription (Tamil):** "அவர் சொன்னார், 'இது ரொம்ப கஷ்டமான வேலை.'"
  *   **English:** "He said, 'This is a very difficult task.'"
  
  **Example 7: Telugu to English**
  *   **Transcription (Telugu):** "అతను చెప్పాడు, 'ఇది చాలా కష్టమైన పని.'"
  *   **English:** "He said, 'This is a very difficult task.'"
  
  **Now, convert the following transcription into clear, natural English:**
  
  Transcription: ${transcription}
  ` }] }],
        }),
      }
    );
  
    if (!geminiResponse.ok) {
      return json({ error: "Failed to process transcription with Gemini API" }, { status: 500 });
    }
  
    const geminiResult = await geminiResponse.json();
    const translatedText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text || "Translation failed.";
  
    return json({ transcription, translatedText });
  };
  