
import React from 'react';
import { ResumeData } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GlobeIcon } from '../IconComponents';

interface TemplateProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-bold text-slate-900 tracking-widest uppercase border-b border-slate-300 pb-2 mb-4 mt-6">
    {children}
  </h2>
);

const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-8 md:p-12 text-slate-800 font-serif shadow-lg h-full">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-slate-900">{data.name}</h1>
        <p className="text-xl text-slate-600 mt-2 tracking-wider">{data.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mt-4 font-sans">
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-black">{data.email}</a>
            <span className="text-slate-300">|</span>
            <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-black">{data.phone}</a>
            <span className="text-slate-300">|</span>
            <p className="flex items-center gap-2">{data.location}</p>
            <span className="text-slate-300">|</span>
            <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black">{data.linkedin}</a>
        </div>
      </header>
      
      <section className="mb-6 text-center">
        <p className="text-slate-700 leading-relaxed italic max-w-3xl mx-auto">{data.summary}</p>
      </section>

      <section className="mb-6">
        <SectionTitle>Professional Experience</SectionTitle>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-bold text-slate-800">{exp.company}</h3>
              <p className="text-sm text-slate-500 font-sans">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="text-lg font-semibold text-slate-600 mb-2">{exp.title} - {exp.location}</p>
            <ul className="list-none text-slate-700 leading-relaxed space-y-2 font-sans">
              {exp.description.map((item, index) => 
                <li key={index} className="flex gap-2">
                    <span className="text-slate-400 mt-1">&#9679;</span>
                    <span>{item}</span>
                </li>)}
            </ul>
          </div>
        ))}
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <section className="mb-6">
            <SectionTitle>Core Skills</SectionTitle>
            <ul className="columns-2 font-sans text-sm space-y-1">
            {data.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
        </section>

        <section className="mb-6">
            <SectionTitle>Education</SectionTitle>
            {data.educations.map((edu) => (
            <div key={edu.id} className="mb-2">
                <h3 className="text-lg font-bold text-slate-800">{edu.institution}</h3>
                <div className="flex justify-between items-baseline font-sans">
                    <p className="text-md text-slate-600">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.startDate} - {edu.endDate}</p>
                </div>
            </div>
            ))}
        </section>
      </div>
      
      <section>
        <SectionTitle>Key Projects</SectionTitle>
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-4 font-sans">
             <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-slate-800">{proj.name}</h3>
                <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-sm text-blue-700 hover:underline">{proj.link}</a>
            </div>
            <p className="text-slate-700 my-1">{proj.description}</p>
            <p className="text-sm text-slate-600"><strong>Technologies:</strong> {proj.technologies.join(', ')}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ExecutiveTemplate;
