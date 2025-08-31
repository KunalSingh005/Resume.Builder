
import React from 'react';
import { ResumeData } from '../../types';
import { MailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GlobeIcon } from '../IconComponents';

interface TemplateProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-6 pb-2 border-b-2 border-slate-200">
    {children}
  </h2>
);

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white font-sans shadow-lg h-full">
      {/* Header */}
      <header className="bg-teal-700 text-white p-8 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold">{data.name}</h1>
        <p className="text-xl text-teal-200 mt-2">{data.jobTitle}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-teal-100 mt-6">
          <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-white"><MailIcon className="w-4 h-4" />{data.email}</a>
          <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-white"><PhoneIcon className="w-4 h-4" />{data.phone}</a>
          <p className="flex items-center gap-2"><LocationIcon className="w-4 h-4" />{data.location}</p>
          <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><LinkedInIcon className="w-4 h-4" />{data.linkedin}</a>
          <a href={`https://${data.portfolio}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><GlobeIcon className="w-4 h-4" />{data.portfolio}</a>
        </div>
      </header>
      
      <main className="p-8 md:p-10 text-slate-700">
        {/* Summary */}
        <section>
          <SectionTitle>Profile</SectionTitle>
          <p className="leading-relaxed">{data.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <SectionTitle>Experience</SectionTitle>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-6 grid grid-cols-4 gap-4">
              <div className="col-span-1 text-sm text-slate-500">
                <p>{exp.startDate} -</p>
                <p>{exp.endDate}</p>
              </div>
              <div className="col-span-3">
                <h3 className="text-lg font-semibold text-slate-800">{exp.title}</h3>
                <p className="text-md font-medium text-teal-700">{exp.company} - {exp.location}</p>
                <ul className="list-disc list-inside mt-2 space-y-1 leading-relaxed">
                  {exp.description.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </section>
        
        {/* Projects */}
        <section>
            <SectionTitle>Projects</SectionTitle>
            {data.projects.map((proj) => (
                <div key={proj.id} className="mb-5">
                    <h3 className="text-lg font-semibold text-slate-800">{proj.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-teal-700 mb-1">
                        <span>{proj.technologies.join(', ')}</span>
                        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{proj.link}</a>
                    </div>
                    <p className="leading-relaxed">{proj.description}</p>
                </div>
            ))}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {/* Skills */}
            <section>
                <SectionTitle>Skills</SectionTitle>
                <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => <span key={skill} className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded">{skill}</span>)}
                </div>
            </section>

            {/* Education */}
            <section>
                <SectionTitle>Education</SectionTitle>
                {data.educations.map((edu) => (
                <div key={edu.id} className="mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{edu.institution}</h3>
                    <p className="text-md text-slate-600">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.startDate} - {edu.endDate}</p>
                </div>
                ))}
            </section>
        </div>
      </main>
    </div>
  );
};

export default CreativeTemplate;