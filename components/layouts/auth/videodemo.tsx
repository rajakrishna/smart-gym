'use client';

export default function DemoVideo() {
  return (
    <section id="demo" className="w-full px-4 py-20 bg-black flex justify-center items-center">
      <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/S72cqz5Z4Us?rel=0"
          title="Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
      </div>
    </section>
  );
}
