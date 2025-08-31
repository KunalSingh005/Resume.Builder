
import React from 'react';
import { ResumeData } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GlobeIcon } from '../IconComponents';

interface TemplateProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h2 className={`text-lg font-bold text-cyan-700 uppercase tracking-wider pb-1 mb-4 ${className}`}>
    {children}
  </h2>
);

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white font-sans shadow-lg flex h-full">
      {/* Left Column */}
      <aside className="bg-slate-800 text-white w-1/3 p-8">
        <header className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">{data.name}</h1>
            <p className="text-md text-cyan-300 mt-1">{data.jobTitle}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-cyan-300 uppercase tracking-wider mb-4">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><MailIcon className="w-4 h-4 text-cyan-300 flex-shrink-0" /><a href={`mailto:${data.email}`} className="hover:text-cyan-300 break-all">{data.email}</a></li>
            <li className="flex items-center gap-3"><PhoneIcon className="w-4 h-4 text-cyan-300 flex-shrink-0" />{data.phone}</li>
            <li className="flex items-center gap-3"><LocationIcon className="w-4 h-4 text-cyan-300 flex-shrink-0" />{data.location}</li>
            <li className="flex items-center gap-3"><LinkedInIcon className="w-4 h-4 text-cyan-300 flex-shrink-0" /><a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-cyan-300 break-all">{data.linkedin}</a></li>
            <li className="flex items-center gap-3"><GlobeIcon className="w-4 h-4 text-cyan-300 flex-shrink-0" /><a href={`https://${data.portfolio}`} target="_blank" rel="noreferrer" className="hover:text-cyan-300 break-all">{data.portfolio}</a></li>
          </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-lg font-semibold text-cyan-300 uppercase tracking-wider mb-4">Skills</h2>
            <ul className="space-y-2">
                {data.skills.map(skill => <li key={skill} className="text-sm">{skill}</li>)}
            </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-cyan-300 uppercase tracking-wider mb-4">Education</h2>
          {data.educations.map(edu => (
            <div key={edu.id}>
              <h3 className="font-bold text-md">{edu.institution}</h3>
              <p className="text-sm text-slate-300">{edu.degree}</p>
              <p className="text-xs text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-8 text-slate-700">
        <section className="mb-8">
          <SectionTitle>Summary</SectionTitle>
          <p className="leading-relaxed text-sm">{data.summary}</p>
        </section>

        <section className="mb-8">
          <SectionTitle>Work Experience</SectionTitle>
          {data.experiences.map(exp => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-md text-slate-800">{exp.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-sm font-semibold text-cyan-600">{exp.company} | {exp.location}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm leading-relaxed">
                {exp.description.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>
        
        <section>
          <SectionTitle>Projects</SectionTitle>
           {data.projects.map((proj) => (
            <div key={proj.id} className="mb-4">
                <h3 className="font-bold text-md text-slate-800">{proj.name}</h3>
                <p className="text-cyan-600 text-sm font-semibold">{proj.technologies.join(' | ')}</p>
                <p className="text-sm leading-relaxed my-1">{proj.description}</p>
                <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">{proj.link}</a>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ModernTemplate;
