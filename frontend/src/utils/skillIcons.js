import {
  Code2,
  Database,
  Server,
  GitBranch,
  Github,
  Terminal,
  Globe,
  Palette,
  Lock,
  ShieldCheck,
  Layers,
  RefreshCw,
  Send,
  Box,
  Boxes,
  Workflow,
  Component,
} from 'lucide-react';

// Ordered rules — first substring match wins. Keeps this a simple,
// maintainable lookup rather than an exhaustive per-name map.
const RULES = [
  [/sanctum|auth/i, ShieldCheck],
  [/laravel|codeigniter|node/i, Server],
  [/rest api|api design/i, Workflow],
  [/mvc|service layer/i, Layers],
  [/react|component/i, Component],
  [/jquery|ajax/i, RefreshCw],
  [/tailwind|css/i, Palette],
  [/html|globe|web/i, Globe],
  [/mysql|postgres|clickhouse|database|sql/i, Database],
  [/git(hub)?$/i, Github],
  [/git/i, GitBranch],
  [/postman|send/i, Send],
  [/docker/i, Box],
  [/kubernetes/i, Boxes],
  [/python|terminal|php|javascript/i, Terminal],
  [/lock|security/i, Lock],
];

export default function getSkillIcon(name = '') {
  for (const [pattern, Icon] of RULES) {
    if (pattern.test(name)) return Icon;
  }
  return Code2;
}
