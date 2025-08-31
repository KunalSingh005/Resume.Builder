
import React from 'react';
import { ResumeData } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GlobeIcon } from '../IconComponents';

interface TemplateProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-4 mt-6">
    {children}
  </h2>
);

const FunctionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-8 md:p-10 text-slate-800 font-sans shadow-lg h-full">
      <header className="text-left mb-8">
        <h1 className="text-4xl font-bold text-slate-900">{data.name}</h1>
        <p className="text-lg text-indigo-600 font-light mt-1">{data.jobTitle}</p>
      </header>

       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs text-slate-600 mb-8 border-y border-slate-200 py-3">
          <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-indigo-600 col-span-2 md:col-span-1"><MailIcon className="w-4 h-4" />{data.email}</a>
          <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-indigo-600"><PhoneIcon className="w-4 h-4" />{data.phone}</a>
          <p className="flex items-center gap-2"><LocationIcon className="w-4 h-4" />{data.location}</p>
          <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-600"><LinkedInIcon className="w-4 h-4" />{data.linkedin}</a>
          <a href={`https://${data.portfolio}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-600"><GlobeIcon className="w-4 h-4" />{data.portfolio}</a>
      </div>

      <section className="mb-6">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-slate-700 leading-relaxed text-sm">{data.summary}</p>
      </section>

      <section className="mb-6">
        <SectionTitle>Core Competencies & Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
                <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                {skill}
                </span>
            ))}
        </div>
      </section>

      <section className="mb-6">
        <SectionTitle>Professional Experience</SectionTitle>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-md font-semibold text-slate-800">{exp.title} at <span className="text-indigo-700">{exp.company}</span></h3>
              <p className="text-xs text-slate-500 font-mono">{exp.startDate} - {exp.endDate}</p>
            </div>
            <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1 text-sm mt-1">
              {exp.description.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <SectionTitle>Projects</SectionTitle>
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-4">
            <h3 className="text-md font-semibold text-slate-800">{proj.name}</h3>
            <p className="text-sm leading-relaxed my-1">{proj.description}</p>
            <div className="flex items-center justify-between text-xs">
                <p className="text-slate-600"><strong>Tech Stack:</strong> {proj.technologies.join(', ')}</p>
                <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{proj.link}</a>
            </div>
          </div>
        ))}
      </section>

      <section>
        <SectionTitle>Education</SectionTitle>
        {data.educations.map((edu) => (
          <div key={edu.id} className="flex justify-between items-baseline mb-1">
            <div>
              <h3 className="text-md font-semibold text-slate-800">{edu.institution}</h3>
              <p className="text-sm text-slate-600">{edu.degree}</p>
            </div>
            <p className="text-xs text-slate-500 font-mono">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FunctionalTemplate;
