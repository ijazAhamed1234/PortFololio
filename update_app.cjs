const fs = require('fs');
const path = require('path');
const p = path.join('i:', 'Modern Portfolio Website UI', 'src', 'app', 'App.tsx');
let content = fs.readFileSync(p, 'utf8');

// 1. Add handleSendMail function
if (!content.includes('handleSendMail')) {
  content = content.replace(
    'const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })\n',
    'const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })\n\n  const handleSendMail = (e: React.FormEvent) => {\n    e.preventDefault();\n    const mailtoLink = `mailto:ijasahamed0123@gmail.com?subject=${encodeURIComponent(form.subject || "New Contact from Portfolio")}&body=${encodeURIComponent(`Name: ${form.name}\\nEmail: ${form.email}\\n\\nMessage:\\n${form.message}`)}`;\n    window.location.href = mailtoLink;\n  };\n'
  );
}

// 2. Change form onSubmit
content = content.replace(
  '<form className="space-y-5" onSubmit={e => e.preventDefault()}>',
  '<form className="space-y-5" onSubmit={handleSendMail}>'
);

// 3. Replace bg color for the whole app to black
content = content.replace('bg-[#0F172A]', 'bg-black');
// also replace the mobile menu and header backgrounds
content = content.replace(/bg-\\[#0F172A\\]/g, 'bg-black');

// 4. Update the ambient background to have motion animation and violet/purple colors
const oldAmbient = /<div className="fixed inset-0 pointer-events-none" aria-hidden>[\s\S]*?<\/div>\s*<\/div>/m;
const newAmbient = `<div className="fixed inset-0 pointer-events-none" aria-hidden>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-700/20 blur-[130px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-fuchsia-500/12 blur-[110px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3], x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 w-[480px] h-[480px] rounded-full bg-purple-900/30 blur-[100px]" 
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.07) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>`;
content = content.replace(oldAmbient, newAmbient);

// 5. Replace tailwind colors: blue -> violet, cyan -> fuchsia (fuchsia looks better with violet)
content = content.replace(/blue-/g, 'violet-');
content = content.replace(/cyan-/g, 'fuchsia-');

fs.writeFileSync(p, content, 'utf8');
console.log('App.tsx updated successfully.');
