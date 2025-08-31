import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ResumeData, Experience, Education, Project } from './types';
import { DEFAULT_RESUME_DATA, TEMPLATE_NAMES } from './constants';
import ClassicTemplate from './components/templates/Classic';
import ModernTemplate from './components/templates/Modern';
import CreativeTemplate from './components/templates/Creative';
import FunctionalTemplate from './components/templates/Functional';
import ExecutiveTemplate from './components/templates/Executive';
import {
  ChevronDownIcon, PlusCircleIcon, TrashIcon, CopyIcon, DownloadIcon, UserCircleIcon, IdentificationIcon, CommandLineIcon, BriefcaseIcon, SparklesIcon, AcademicCapIcon, RocketIcon
} from './components/IconComponents';

const templates = [
  ClassicTemplate,
  ModernTemplate,
  CreativeTemplate,
  FunctionalTemplate,
  ExecutiveTemplate,
];

const generatePlainTextResume = (data: ResumeData): string => {
  let text = '';
  text += `${data.name.toUpperCase()}\n`;
  text += `${data.jobTitle}\n\n`;
  text += `CONTACT\n${data.email} | ${data.phone} | ${data.location}\nLinkedIn: ${data.linkedin} | Portfolio: ${data.portfolio}\n\n`;
  text += `---\n\nSUMMARY\n${data.summary}\n\n`;
  text += `---\n\nSKILLS\n${data.skills.join(', ')}\n\n`;
  text += `---\n\nWORK EXPERIENCE\n\n`;
  data.experiences.forEach(exp => {
    text += `${exp.title.toUpperCase()} | ${exp.company}\n`;
    text += `${exp.startDate} - ${exp.endDate} | ${exp.location}\n`;
    exp.description.forEach(desc => {
      text += `- ${desc}\n`;
    });
    text += '\n';
  });
  text += `---\n\nPROJECTS\n\n`;
  data.projects.forEach(proj => {
      text += `${proj.name.toUpperCase()}\n`;
      text += `${proj.description}\n`;
      text += `Technologies: ${proj.technologies.join(', ')}\n`;
      text += `Link: ${proj.link}\n\n`;
  });
  text += `---\n\nEDUCATION\n\n`;
  data.educations.forEach(edu => {
    text += `${edu.degree}, ${edu.institution}\n`;
    text += `${edu.startDate} - ${edu.endDate}\n\n`;
  });
  return text;
};

// Helper components moved outside the App component to prevent re-creation on re-renders, fixing the input focus bug.
const EditorSection: React.FC<{title: string; icon: React.ReactNode; isOpen: boolean; onToggle: () => void; children: React.ReactNode}> = ({title, icon, isOpen, onToggle, children}) => (
    <div className="mb-4 bg-slate-800 rounded-xl shadow-lg transition-all duration-300 border border-slate-700">
        <button onClick={onToggle} className="w-full flex justify-between items-center p-4 text-left" aria-expanded={isOpen} >
            <div className="flex items-center gap-3">
                <span className="text-cyan-400">{icon}</span>
                <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`} >
            <div className="p-4 pt-0">{children}</div>
        </div>
    </div>
);

const InputField: React.FC<{label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => (
    <div className="mb-3">
        <label className="text-sm font-medium text-slate-400 block mb-1.5">{label}</label>
        <input type="text" value={value} onChange={onChange} className="w-full px-3 py-2 text-sm bg-slate-700/50 text-slate-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
    </div>
);

const TextAreaField: React.FC<{label: string; value: string; rows?: number; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = ({label, value, rows=5, onChange}) => (
  <div className="mb-3">
      <label className="text-sm font-medium text-slate-400 block mb-1.5">{label}</label>
      <textarea value={value} onChange={onChange} rows={rows} className="w-full px-3 py-2 text-sm bg-slate-700/50 text-slate-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
  </div>
);

const AddButton: React.FC<{onClick: () => void; children: React.ReactNode}> = ({onClick, children}) => (
  <button onClick={onClick} className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-cyan-400 hover:text-white transition-colors py-2 border-2 border-dashed border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10 rounded-lg mt-2">
      <PlusCircleIcon className="w-5 h-5"/>
      {children}
  </button>
);


const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copyStatus, setCopyStatus] = useState('Copy Text');
  const [downloadState, setDownloadState] = useState({ inProgress: false, format: null as 'PDF' | 'DOCX' | null });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Personal Details': true,
    'Summary': false,
    'Skills': false,
    'Work Experience': true,
    'Projects': false,
    'Education': false,
  });

  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopy = useCallback(() => {
    const plainText = generatePlainTextResume(resumeData);
    navigator.clipboard.writeText(plainText).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy Text'), 2000);
    }, () => {
      setCopyStatus('Failed!');
      setTimeout(() => setCopyStatus('Copy Text'), 2000);
    });
  }, [resumeData]);

  const handleDownloadPdf = useCallback(() => {
    const resumeElement = resumePreviewRef.current;
    if (!resumeElement || downloadState.inProgress) return;
    setDownloadState({ inProgress: true, format: 'PDF' });
    const html2canvas = (window as any).html2canvas;
    const { jsPDF } = (window as any).jspdf;

    if (!html2canvas || !jsPDF) {
        console.error("PDF generation libraries not loaded.");
        alert("Could not download PDF. Please try again later.");
        setDownloadState({ inProgress: false, format: null });
        return;
    }
    html2canvas(resumeElement, { scale: 3, useCORS: true, logging: false, backgroundColor: null })
      .then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`);
      }).catch((err: any) => {
        console.error("Failed to generate PDF:", err);
        alert("An error occurred while generating the PDF.");
      }).finally(() => {
        setDownloadState({ inProgress: false, format: null });
      });
  }, [resumeData.name, downloadState.inProgress]);

  const handleDownloadDocx = useCallback(async () => {
    const resumeElement = resumePreviewRef.current?.firstElementChild;
    if (!resumeElement || downloadState.inProgress) return;
    setDownloadState({ inProgress: true, format: 'DOCX' });
    try {
        const htmlToDocx = (window as any).htmlToDocx;
        if (!htmlToDocx) throw new Error("html-to-docx library not loaded.");
        
        // Clone the element to avoid modifying the displayed resume
        const elementToExport = resumeElement.cloneNode(true) as HTMLElement;

        // Remove all SVG elements from the clone, as they are often unsupported 
        // by HTML-to-DOCX converters and can cause errors.
        elementToExport.querySelectorAll('svg').forEach(svg => svg.remove());
        
        const blob = await htmlToDocx(elementToExport.outerHTML, {
            margins: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
            },
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.name.replace(/\s+/g, '_')}_Resume.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Failed to generate DOCX:", err);
        alert("An error occurred while generating the DOCX file.");
    } finally {
        setDownloadState({ inProgress: false, format: null });
    }
}, [resumeData.name, downloadState.inProgress]);

  const onDownloadPdf = () => { setIsDropdownOpen(false); handleDownloadPdf(); };
  const onDownloadDocx = () => { setIsDropdownOpen(false); handleDownloadDocx(); };
  
  const handleInputChange = <T extends keyof ResumeData>(field: T, value: ResumeData[T]) => setResumeData(prev => ({ ...prev, [field]: value }));
  
  const handleNestedChange = <K extends keyof ResumeData>(section: K, index: number, field: any, value: any) => {
    const sectionData = resumeData[section] as any[];
    const updatedSection = [...sectionData];
    if (field === null) { // For flat arrays like skills
        updatedSection[index] = value;
    } else {
        updatedSection[index] = { ...updatedSection[index], [field]: value };
    }
    handleInputChange(section, updatedSection as any);
  };
  
  const handleNestedArrayChange = (section: keyof ResumeData, itemIndex: number, field: 'description' | 'technologies', descIndex: number, value: string) => {
    const sectionData = resumeData[section] as any[];
    const updatedSection = [...sectionData];
    updatedSection[itemIndex] = { ...updatedSection[itemIndex], [field]: [...updatedSection[itemIndex][field].slice(0, descIndex), value, ...updatedSection[itemIndex][field].slice(descIndex + 1)] };
    handleInputChange(section, updatedSection as any);
  };

  const addNestedItem = (section: 'experiences' | 'educations' | 'projects' | 'skills') => {
      if (section === 'skills') {
          handleInputChange('skills', [...resumeData.skills, 'New Skill']);
      } else {
        const sectionData = resumeData[section] as any[];
        const newItem = section === 'experiences' ? { id: Date.now(), title: '', company: '', location: '', startDate: '', endDate: '', description: [''] }
                      : section === 'educations' ? { id: Date.now(), institution: '', degree: '', location: '', startDate: '', endDate: '' }
                      : { id: Date.now(), name: '', description: '', technologies: [''], link: '' };
        handleInputChange(section, [...sectionData, newItem] as any);
      }
  };

  const removeNestedItem = (section: keyof ResumeData, index: number) => {
      const sectionData = resumeData[section] as any[];
      handleInputChange(section, sectionData.filter((_, i) => i !== index) as any);
  };

  const toggleSection = (title: string) => setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  const SelectedTemplateComponent = templates[selectedTemplate];

  return (
    <div className="min-h-screen font-sans bg-slate-900">
        <header className="bg-slate-900/70 backdrop-blur-lg shadow-lg shadow-slate-950/20 sticky top-0 z-20 border-b border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Resume<span className="text-cyan-400">.</span>Builder</h1>
                <p className="text-sm text-slate-400 hidden md:block">Design your future. Build a standout resume.</p>
            </div>
        </header>

        <main className="grid grid-cols-12 gap-8 p-4 sm:p-6 lg:p-8">
            <aside className="col-span-12 lg:col-span-5 xl:col-span-4 h-full">
                <div className="lg:sticky lg:top-24"><div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 -mr-4">
                    <div className="mb-4 bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-4">
                        <div className="flex items-center gap-3">
                            <RocketIcon className="w-6 h-6 text-cyan-400"/>
                            <h3 className="text-lg font-semibold text-slate-100">AI Assistant</h3>
                        </div>
                        <div className="mt-4 text-center p-4 border border-dashed border-slate-700 rounded-xl bg-slate-800/50">
                            <p className="text-slate-400 italic">AI Assistant – Coming Soon 🚀</p>
                        </div>
                    </div>
                    <EditorSection title="Personal Details" icon={<UserCircleIcon className="w-6 h-6"/>} isOpen={openSections['Personal Details']} onToggle={() => toggleSection('Personal Details')}>
                        <InputField label="Full Name" value={resumeData.name} onChange={e => handleInputChange('name', e.target.value)} />
                        <InputField label="Job Title" value={resumeData.jobTitle} onChange={e => handleInputChange('jobTitle', e.target.value)} />
                        <InputField label="Email" value={resumeData.email} onChange={e => handleInputChange('email', e.target.value)} />
                        <InputField label="Phone" value={resumeData.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                        <InputField label="Location" value={resumeData.location} onChange={e => handleInputChange('location', e.target.value)} />
                        <InputField label="LinkedIn Profile URL" value={resumeData.linkedin} onChange={e => handleInputChange('linkedin', e.target.value)} />
                        <InputField label="Portfolio URL" value={resumeData.portfolio} onChange={e => handleInputChange('portfolio', e.target.value)} />
                    </EditorSection>
                    <EditorSection title="Summary" icon={<IdentificationIcon className="w-6 h-6"/>} isOpen={openSections['Summary']} onToggle={() => toggleSection('Summary')}><TextAreaField label="Professional Summary" value={resumeData.summary} onChange={e => handleInputChange('summary', e.target.value)} /></EditorSection>
                    <EditorSection title="Skills" icon={<CommandLineIcon className="w-6 h-6"/>} isOpen={openSections['Skills']} onToggle={() => toggleSection('Skills')}>
                        <div className="grid grid-cols-2 gap-2">
                          {resumeData.skills.map((skill, i) => ( <div key={i} className="relative group">
                            <input type="text" value={skill} onChange={e => handleNestedChange('skills', i, null, e.target.value)} className="w-full pr-8 pl-3 py-2 text-sm bg-slate-700/50 text-slate-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
                            <button onClick={() => removeNestedItem('skills', i)} className="absolute top-1/2 right-1 -translate-y-1/2 text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-4 h-4"/></button>
                          </div>))}
                        </div>
                        <AddButton onClick={() => addNestedItem('skills')}>Add Skill</AddButton>
                    </EditorSection>
                    <EditorSection title="Work Experience" icon={<BriefcaseIcon className="w-6 h-6"/>} isOpen={openSections['Work Experience']} onToggle={() => toggleSection('Work Experience')}>{resumeData.experiences.map((exp, i) => (
                      <div key={exp.id} className="border border-slate-700 p-4 rounded-lg mb-4 bg-slate-800/50 relative group">
                          <button onClick={() => removeNestedItem('experiences', i)} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-5 h-5"/></button>
                          <InputField label="Job Title" value={exp.title} onChange={e => handleNestedChange('experiences', i, 'title', e.target.value)} />
                          <InputField label="Company" value={exp.company} onChange={e => handleNestedChange('experiences', i, 'company', e.target.value)} />
                          <InputField label="Location" value={exp.location} onChange={e => handleNestedChange('experiences', i, 'location', e.target.value)} />
                          <div className="grid grid-cols-2 gap-2"><InputField label="Start Date" value={exp.startDate} onChange={e => handleNestedChange('experiences', i, 'startDate', e.target.value)} /><InputField label="End Date" value={exp.endDate} onChange={e => handleNestedChange('experiences', i, 'endDate', e.target.value)} /></div>
                          <div><label className="text-sm font-medium text-slate-400 block mb-1.5">Description (one per line)</label>
                          {exp.description.map((desc, j) => (<textarea key={j} value={desc} onChange={e => handleNestedArrayChange('experiences', i, 'description', j, e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-slate-700 text-slate-200 border border-slate-600 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />))}</div>
                      </div>))}
                      <AddButton onClick={() => addNestedItem('experiences')}>Add Experience</AddButton>
                    </EditorSection>
                    <EditorSection title="Projects" icon={<SparklesIcon className="w-6 h-6"/>} isOpen={openSections['Projects']} onToggle={() => toggleSection('Projects')}>{resumeData.projects.map((proj, i) => (
                      <div key={proj.id} className="border border-slate-700 p-4 rounded-lg mb-4 bg-slate-800/50 relative group">
                        <button onClick={() => removeNestedItem('projects', i)} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-5 h-5"/></button>
                        <InputField label="Project Name" value={proj.name} onChange={e => handleNestedChange('projects', i, 'name', e.target.value)} />
                        <TextAreaField label="Description" value={proj.description} onChange={e => handleNestedChange('projects', i, 'description', e.target.value)} />
                        <InputField label="Technologies (comma-separated)" value={proj.technologies.join(',')} onChange={e => handleNestedChange('projects', i, 'technologies', e.target.value.split(','))} />
                        <InputField label="Project Link" value={proj.link} onChange={e => handleNestedChange('projects', i, 'link', e.target.value)} />
                      </div>))}
                      <AddButton onClick={() => addNestedItem('projects')}>Add Project</AddButton>
                    </EditorSection>
                    <EditorSection title="Education" icon={<AcademicCapIcon className="w-6 h-6"/>} isOpen={openSections['Education']} onToggle={() => toggleSection('Education')}>{resumeData.educations.map((edu, i) => (
                      <div key={edu.id} className="border border-slate-700 p-4 rounded-lg mb-4 bg-slate-800/50 relative group">
                        <button onClick={() => removeNestedItem('educations', i)} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-5 h-5"/></button>
                        <InputField label="Institution" value={edu.institution} onChange={e => handleNestedChange('educations', i, 'institution', e.target.value)} />
                        <InputField label="Degree/Certificate" value={edu.degree} onChange={e => handleNestedChange('educations', i, 'degree', e.target.value)} />
                        <div className="grid grid-cols-2 gap-2"><InputField label="Start Date" value={edu.startDate} onChange={e => handleNestedChange('educations', i, 'startDate', e.target.value)} /><InputField label="End Date" value={edu.endDate} onChange={e => handleNestedChange('educations', i, 'endDate', e.target.value)} /></div>
                      </div>))}
                      <AddButton onClick={() => addNestedItem('educations')}>Add Education</AddButton>
                    </EditorSection>
                </div></div>
            </aside>

            <section className="col-span-12 lg:col-span-7 xl:col-span-8">
                <div className="sticky top-24">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-slate-100 mb-4">Choose a Template</h3>
                        <div className="flex items-start gap-5 overflow-x-auto pb-4 -mx-4 px-4">
                            {templates.map((Template, index) => {
                                const isSelected = selectedTemplate === index;
                                return (
                                    <button
                                        key={TEMPLATE_NAMES[index]}
                                        onClick={() => setSelectedTemplate(index)}
                                        className={`flex-shrink-0 w-48 block rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 group focus:outline-none ring-offset-2 ring-offset-slate-900 focus:ring-cyan-400 ${
                                            isSelected
                                                ? 'ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                                                : 'ring-1 ring-slate-700 hover:ring-cyan-500'
                                        }`}
                                    >
                                        <div className="h-[272px] bg-white overflow-hidden">
                                            <div
                                                className="w-[800px] h-[1131px] origin-top-left pointer-events-none"
                                                style={{ transform: 'scale(0.24)' }}
                                            >
                                                <Template data={DEFAULT_RESUME_DATA} />
                                            </div>
                                        </div>
                                        <p className={`w-full text-center text-sm font-semibold py-2 transition-colors duration-300 ${
                                            isSelected 
                                                ? 'bg-cyan-400 text-slate-900' 
                                                : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                                        }`}>
                                            {TEMPLATE_NAMES[index]}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-end gap-3 mb-4 bg-slate-800/60 backdrop-blur-lg p-3 rounded-xl shadow-lg border border-slate-700">
                       <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-cyan-300 bg-cyan-400/10 rounded-lg hover:bg-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all">
                           <CopyIcon className="w-4 h-4"/>{copyStatus}
                       </button>
                        <div ref={dropdownRef} className="relative">
                            <button onClick={() => setIsDropdownOpen(p => !p)} disabled={downloadState.inProgress} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all disabled:bg-cyan-500/50 disabled:cursor-not-allowed">
                                <DownloadIcon className="w-4 h-4" />{downloadState.inProgress ? `Downloading ${downloadState.format}...` : 'Download'}<ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (<div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-md shadow-lg z-30 ring-1 ring-slate-700">
                                <ul className="py-1">
                                    <li><button onClick={onDownloadPdf} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">as PDF</button></li>
                                    <li><button onClick={onDownloadDocx} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">as DOCX</button></li>
                                </ul>
                            </div>)}
                        </div>
                    </div>

                  <div className="max-h-[calc(100vh-25rem)] overflow-y-auto rounded-lg shadow-2xl shadow-slate-950/50 bg-gradient-to-tr from-slate-800 to-slate-700 p-2 md:p-4 ring-1 ring-slate-700">
                      <div ref={resumePreviewRef} className="w-full aspect-[210/297]"><SelectedTemplateComponent data={resumeData} /></div>
                  </div>
                </div>
            </section>
        </main>
        <footer className="text-center py-8">
            <p className="text-sm text-slate-500">⚡ New features coming soon – stay tuned!</p>
        </footer>
    </div>
  );
};
export default App;
