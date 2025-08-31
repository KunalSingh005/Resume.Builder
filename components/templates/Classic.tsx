
import React from 'react';
import { ResumeData } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GlobeIcon } from '../IconComponents';

interface TemplateProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-300 pb-1 mb-4 font-serif">
    {children}
  </h2>
);

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-8 md:p-12 text-slate-800 font-sans shadow-lg h-full">
      {/* Header */}
      <header className="text-center mb-8 border-b pb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif">{data.name}</h1>
        <p className="text-xl text-slate-600 mt-2">{data.jobTitle}</p>
      </header>
      
      <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-8">
          <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-blue-600"><MailIcon className="w-4 h-4" />{data.email}</a>
          <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-blue-600"><PhoneIcon className="w-4 h-4" />{data.phone}</a>
          <p className="flex items-center gap-2"><LocationIcon className="w-4 h-4" />{data.location}</p>
          <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600"><LinkedInIcon className="w-4 h-4" />{data.linkedin}</a>
          <a href={`https://${data.portfolio}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600"><GlobeIcon className="w-4 h-4" />{data.portfolio}</a>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-slate-700 leading-relaxed">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <SectionTitle>Work Experience</SectionTitle>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-slate-800">{exp.title}</h3>
              <p className="text-sm text-slate-500">{exp.startDate} - {exp.endDate}</p>
            </div>
            <div className="flex justify-between items-baseline mb-2">
                <p className="text-md font-medium text-slate-600">{exp.company}</p>
                <p className="text-sm text-slate-500">{exp.location}</p>
            </div>
            <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
              {exp.description.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>
      
      {/* Projects */}
      <section className="mb-8">
        <SectionTitle>Projects</SectionTitle>
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-4">
             <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-slate-800">{proj.name}</h3>
                <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">{proj.link}</a>
            </div>
            <p className="text-slate-700 leading-relaxed my-1">{proj.description}</p>
            <p className="text-sm text-slate-600"><strong>Technologies:</strong> {proj.technologies.join(', ')}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <SectionTitle>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => <span key={skill} className="bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionTitle>Education</SectionTitle>
        {data.educations.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-slate-800">{edu.institution}</h3>
                <p className="text-sm text-slate-500">{edu.startDate} - {edu.endDate}</p>
            </div>
            <p className="text-md text-slate-600">{edu.degree}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClassicTemplate;