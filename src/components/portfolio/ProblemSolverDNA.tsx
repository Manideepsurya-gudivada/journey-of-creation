import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Bug, BookOpen, Cpu, ExternalLink } from 'lucide-react';

const stats = [
  { icon: Bug, label: 'Bugs Fixed', value: 500, suffix: '+' },
  { icon: BookOpen, label: 'Concepts Learned', value: 150, suffix: '+' },
  { icon: Cpu, label: 'Systems Built', value: 25, suffix: '+' },
];

// Skill icons as SVG components
const JavaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.154 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
  </svg>
);

const HTMLIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

const CSSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
  </svg>
);

const skills = [
  { name: 'Java', icon: JavaIcon, level: 'Advanced', color: 'group-hover:text-[#ED8B00]' },
  { name: 'Python', icon: PythonIcon, level: 'Intermediate', color: 'group-hover:text-[#3776AB]' },
  { name: 'React', icon: ReactIcon, level: 'Intermediate', color: 'group-hover:text-[#61DAFB]' },
  { name: 'JavaScript', icon: JavaScriptIcon, level: 'Intermediate', color: 'group-hover:text-[#F7DF1E]' },
  { name: 'HTML', icon: HTMLIcon, level: 'Advanced', color: 'group-hover:text-[#E34F26]' },
  { name: 'CSS', icon: CSSIcon, level: 'Advanced', color: 'group-hover:text-[#1572B6]' },
  { name: 'Tailwind', icon: TailwindIcon, level: 'Intermediate', color: 'group-hover:text-[#06B6D4]' },
  { name: 'Git', icon: GitIcon, level: 'Intermediate', color: 'group-hover:text-[#F05032]' },
];

// Coding platform icons as SVG components
const CodeChefIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.186-.39.43-.49.704-.096.278-.136.581-.096.869.028.187.086.368.154.543.06.139.123.276.192.412.168.33.358.651.5.998.087.209.167.422.223.64.056.217.086.454.047.675-.045.244-.16.467-.302.665-.346.482-.752.912-1.051 1.435a5.403 5.403 0 00-.486 1.118c-.132.463-.181.945-.168 1.427.014.476.078.95.176 1.418.097.465.222.923.382 1.366.152.42.339.83.555 1.218.216.387.46.757.732 1.103.273.346.569.669.893.96.162.146.333.281.506.412l.004.003c.192.142.393.27.6.387.358.202.733.376 1.127.498.378.117.77.19 1.163.216.393.026.79.01 1.184-.04.394-.051.786-.134 1.165-.247.191-.057.379-.12.563-.192.386-.15.76-.335 1.107-.558.174-.112.34-.235.497-.367.156-.131.305-.272.44-.423.27-.302.497-.642.666-1.01.169-.37.28-.767.328-1.173.049-.406.039-.82-.016-1.228a5.316 5.316 0 00-.236-.956c-.064-.184-.141-.364-.227-.54l-.135-.27a6.2 6.2 0 01-.149-.328c-.08-.202-.142-.414-.167-.633-.024-.218-.008-.442.057-.653.058-.188.156-.36.286-.505.265-.295.604-.509.94-.71.337-.2.686-.387.99-.633.153-.123.294-.262.41-.421.115-.16.206-.34.256-.535.05-.194.059-.4.021-.597a1.632 1.632 0 00-.202-.523 2.31 2.31 0 00-.349-.423c-.268-.27-.587-.484-.918-.67-.331-.186-.675-.345-1.025-.488-.35-.143-.707-.27-1.07-.382a12.44 12.44 0 00-1.092-.28 6.689 6.689 0 00-1.103-.129c-.098-.003-.197-.003-.294.002z"/>
  </svg>
);

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const GFGIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.174-.637h5.432a.876.876 0 0 0 .876-.875V9.851a.876.876 0 0 0-.876-.876h-7.57a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h.834c.106.618.344 1.209.694 1.734a4.893 4.893 0 0 0 1.457 1.364c-.24.176-.504.328-.785.447a5.24 5.24 0 0 1-2.199.444 5.34 5.34 0 0 1-2.204-.453 5.451 5.451 0 0 1-1.747-1.226 5.474 5.474 0 0 1-1.152-1.816 5.753 5.753 0 0 1-.42-2.147c0-.754.138-1.478.418-2.163a5.418 5.418 0 0 1 1.156-1.81 5.46 5.46 0 0 1 1.745-1.228 5.32 5.32 0 0 1 2.204-.454c.78 0 1.517.152 2.199.444.281.119.545.271.785.447a4.893 4.893 0 0 0-1.457 1.364 4.706 4.706 0 0 0-.694 1.734h-.834a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h7.57a.876.876 0 0 0 .876-.876V6.852a.876.876 0 0 0-.876-.875h-5.432c.055-.218.11-.43.174-.637a3.79 3.79 0 0 1 2.135-2.078 4.51 4.51 0 0 1 3.116-.016c.406.14.783.365 1.104.695.231.213.422.465.565.745a.876.876 0 0 0 1.544-.835 4.457 4.457 0 0 0-.887-1.168 4.78 4.78 0 0 0-1.417-.898 6.226 6.226 0 0 0-4.28.02 5.535 5.535 0 0 0-3.122 3.033 6.036 6.036 0 0 0-.4 1.264H8.37a6.036 6.036 0 0 0-.4-1.264A5.535 5.535 0 0 0 4.848 2.84a6.226 6.226 0 0 0-4.28-.02 4.78 4.78 0 0 0-1.417.898A4.457 4.457 0 0 0-1.736 4.886a.876.876 0 0 0 1.544.835c.143-.28.334-.532.565-.745a3.691 3.691 0 0 1 1.104-.695 4.51 4.51 0 0 1 3.116.016 3.79 3.79 0 0 1 2.135 2.078c.064.207.12.419.174.637H1.47a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h7.57a.876.876 0 0 0 .876-.876V7.988a.876.876 0 0 0-.876-.876h-.834a4.706 4.706 0 0 0-.694-1.734 4.893 4.893 0 0 0-1.457-1.364c.24-.176.504-.328.785-.447a5.24 5.24 0 0 1 2.199-.444c.78 0 1.517.152 2.204.454a5.46 5.46 0 0 1 1.745 1.228 5.418 5.418 0 0 1 1.156 1.81c.28.685.418 1.409.418 2.163 0 .755-.14 1.48-.42 2.147a5.474 5.474 0 0 1-1.152 1.816 5.451 5.451 0 0 1-1.747 1.226 5.34 5.34 0 0 1-2.204.453 5.24 5.24 0 0 1-2.199-.444 4.326 4.326 0 0 1-.785-.447 4.893 4.893 0 0 0 1.457-1.364c.35-.525.588-1.116.694-1.734h.834a.876.876 0 0 0 .876-.876V9.851a.876.876 0 0 0-.876-.876H1.47a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h5.432c-.055.218-.11.43-.174.637a3.79 3.79 0 0 1-2.135 2.078 4.51 4.51 0 0 1-3.116.016 3.691 3.691 0 0 1-1.104-.695 2.507 2.507 0 0 1-.565-.745.876.876 0 0 0-1.544.835c.207.453.509.863.887 1.168.445.371.953.672 1.417.898a6.226 6.226 0 0 0 4.28-.02 5.535 5.535 0 0 0 3.122-3.033c.156-.41.285-.833.4-1.264h3.26c.115.431.244.854.4 1.264a5.535 5.535 0 0 0 3.122 3.033 6.226 6.226 0 0 0 4.28.02c.464-.226.972-.527 1.417-.898.378-.305.68-.715.887-1.168a.876.876 0 0 0-1.544-.835z"/>
  </svg>
);

const NxtWaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const codingPlatforms = [
  { 
    name: 'LeetCode', 
    icon: LeetCodeIcon, 
    username: 'manideep_surya',
    url: 'https://leetcode.com/manideep_surya',
    color: 'hover:text-[#FFA116]',
    badge: null
  },
  { 
    name: 'CodeChef', 
    icon: CodeChefIcon, 
    username: 'manideep_surya',
    url: 'https://www.codechef.com/users/manideep_surya',
    color: 'hover:text-[#5B4638]',
    badge: null
  },
  { 
    name: 'GeeksforGeeks', 
    icon: GFGIcon, 
    username: 'manideep_surya',
    url: 'https://auth.geeksforgeeks.org/user/manideep_surya',
    color: 'hover:text-[#2F8D46]',
    badge: null
  },
  { 
    name: 'NxtWave', 
    icon: NxtWaveIcon, 
    username: 'manideep_surya',
    url: 'https://www.ccbp.in/',
    color: 'hover:text-[#1E88E5]',
    badge: 'Currently Learning'
  },
];

const Counter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

const ProblemSolverDNA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Name display - attractive and aesthetic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center relative"
          >
            <motion.div
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <span className="text-xs md:text-sm font-mono text-muted-foreground tracking-[0.3em] uppercase mb-2 block">
                Crafted by
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-gradient">Manideep</span>
                <span className="text-foreground/80"> Surya</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-px w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </motion.div>

          {/* Section header */}
          <div className="text-center space-y-4">
            <p className="font-mono text-sm text-primary tracking-wider uppercase">Problem Solver DNA</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              I don't just write code.{' '}
              <span className="text-gradient">I solve constraints.</span>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group relative p-8 bg-card/50 border border-border/50 rounded-lg text-center hover:border-primary/50 transition-all duration-500 noise-overlay"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </div>
                  
                  <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="font-mono text-sm text-center text-muted-foreground uppercase tracking-wider">
              Technologies I work with
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`group relative p-4 bg-card/50 border border-border/50 rounded-lg text-center hover:border-primary/50 transition-all duration-300 cursor-default ${skill.color}`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-muted-foreground group-hover:text-current transition-colors duration-300">
                        <Icon />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{skill.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground uppercase">{skill.level}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Coding Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="font-mono text-sm text-center text-muted-foreground uppercase tracking-wider">
              Find me solving problems on
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {codingPlatforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`group relative flex items-center gap-3 px-5 py-3 bg-secondary/50 border border-border/50 rounded-lg transition-all duration-300 hover:border-primary/50 hover:bg-secondary ${platform.color}`}
                  >
                    {platform.badge && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-mono rounded-full animate-pulse">
                        {platform.badge}
                      </span>
                    )}
                    <Icon />
                    <div className="text-left">
                      <p className="font-medium text-foreground text-sm">{platform.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">@{platform.username}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-muted-foreground italic">
              "The best solutions come from understanding the problem,
              <br className="hidden md:block" />
              not just the syntax."
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolverDNA;
