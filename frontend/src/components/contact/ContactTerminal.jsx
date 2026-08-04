import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Activity, Phone, MessageSquare } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { api } from '../../services/api';

const COMMANDS = [
  { cmd: 'email', label: 'email', Icon: Mail },
  { cmd: 'phone', label: 'phone', Icon: Phone },
  { cmd: 'linkedin', label: 'linkedin', Icon: Linkedin },
  { cmd: 'github', label: 'github', Icon: Github },
  { cmd: 'resume', label: 'resume', Icon: FileText },
  { cmd: 'status', label: 'status', Icon: Activity },
  { cmd: 'message', label: 'message', Icon: MessageSquare },
];

function ContactForm({ onSent }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setState('sending');
    try {
      await api.sendContactMessage(form);
      setState('sent');
      onSent && onSent();
    } catch (err) {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <p className="font-mono text-sm text-success">
        ✓ message received. Kishor will respond within 24-48 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <div className="flex items-center gap-2">
        <span className="text-success font-mono text-sm">--name</span>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="flex-1 bg-transparent border-b border-white/20 focus:border-blue outline-none font-mono text-sm text-ink py-1"
          placeholder="your name"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-success font-mono text-sm">--email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="flex-1 bg-transparent border-b border-white/20 focus:border-blue outline-none font-mono text-sm text-ink py-1"
          placeholder="your@email.com"
        />
      </div>
      <div className="flex items-start gap-2">
        <span className="text-success font-mono text-sm pt-1">--msg</span>
        <textarea
          required
          minLength={10}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={3}
          className="flex-1 bg-transparent border-b border-white/20 focus:border-blue outline-none font-mono text-sm text-ink py-1 resize-none"
          placeholder="what would you like to build?"
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        data-cursor="interactive"
        disabled={state === 'sending'}
        className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded border border-blue text-blue hover:bg-blue/10 transition-colors disabled:opacity-50"
      >
        {state === 'sending' ? 'sending...' : 'execute send()'}
      </button>
      {state === 'error' && (
        <p className="font-mono text-xs text-orange">
          send failed — backend may not be running. Email directly instead.
        </p>
      )}
    </form>
  );
}

export default function ContactTerminal({ contact, status }) {
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history]);

  function run(cmd) {
    let output;
    switch (cmd) {
      case 'email':
        output = (
          <a href={`mailto:${contact.email}`} data-cursor="interactive" className="flex items-center gap-2 text-blue hover:underline">
            <Mail size={13} /> {contact.email}
          </a>
        );
        break;
      case 'phone':
        output = contact.phone ? (
          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} data-cursor="interactive" className="flex items-center gap-2 text-blue hover:underline">
            <Phone size={13} /> {contact.phone}
          </a>
        ) : (
          <span className="text-orange">no phone number on file</span>
        );
        break;
      case 'linkedin':
        output = (
          <a href={contact.linkedin} target="_blank" rel="noreferrer" data-cursor="interactive" className="flex items-center gap-2 text-blue hover:underline">
            <Linkedin size={13} /> {contact.linkedin}
          </a>
        );
        break;
      case 'github':
        output = (
          <a href={contact.github} target="_blank" rel="noreferrer" data-cursor="interactive" className="flex items-center gap-2 text-blue hover:underline">
            <Github size={13} /> {contact.github}
          </a>
        );
        break;
      case 'resume':
        output = (
          <a href="#resume" data-cursor="interactive" className="flex items-center gap-2 text-blue hover:underline">
            <FileText size={13} /> jump to Resume.md ↑
          </a>
        );
        break;
      case 'status':
        output = (
          <span className="flex items-center gap-2 text-success">
            <Activity size={13} />
            <span className="w-2 h-2 rounded-full bg-success animate-pulseDot" /> {status}
          </span>
        );
        break;
      case 'message':
        output = <ContactForm onSent={() => {}} />;
        break;
      default:
        output = <span className="text-orange">command not found: {cmd}</span>;
    }
    setHistory((h) => [...h, { cmd, output, id: Date.now() + Math.random() }]);
  }

  return (
    <section id="contact" className="section relative">
      <div className="container-os">
        <SectionHeading eyebrow="Get In Touch" title="> connect kishor" />

        <div className="mt-12 rounded-lg border border-white/10 bg-surface overflow-hidden max-w-3xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-elevated">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-mono text-xs text-muted">kishor@ghost-os: ~</span>
          </div>

          <div className="p-5 font-mono text-sm min-h-[220px] max-h-[420px] overflow-y-auto">
            <p className="text-muted mb-4">
              type a command below, or click one — try <span className="text-blue">status</span>
            </p>

            <AnimatePresence initial={false}>
              {history.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-4"
                >
                  <div className="text-ink">
                    <span className="text-success mr-2">$</span>
                    connect kishor --{entry.cmd}
                  </div>
                  <div className="mt-1 pl-4">{entry.output}</div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          <div className="flex flex-wrap gap-2 px-5 pb-5">
            {COMMANDS.map(({ cmd, label, Icon }) => (
              <button
                key={cmd}
                type="button"
                data-cursor="interactive"
                onClick={() => run(cmd)}
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-white/10 text-muted hover:text-ink hover:border-blue/50 transition-colors"
              >
                <Icon size={12} />
                --{label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
