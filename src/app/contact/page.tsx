import React from "react";

export default function Contact() {
  return (  
    <main className='relative min-h-screen bg-black text-white'>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-6 text-white">Contact</h1>
          <p className="text-xl text-gray-300">Get in touch with me</p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg text-cyan-400 mb-2">Email</h3>
            <a 
              href="mailto:domain@andreasmogensen.dk" 
              className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-lg"
            >
              domain@andreasmogensen.dk
            </a>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg text-cyan-400 mb-2">GitHub</h3>
            <a 
              href="https://github.com/BGMCandy/andreasmogensen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-lg"
            >
              github.com/BGMCandy
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}       