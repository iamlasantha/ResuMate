"use client";

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/store/useResumeStore';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    color: '#333333',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#0f172a', // slate-900
    color: '#ffffff',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
    color: '#ffffff',
  },
  title: {
    fontSize: 12,
    color: '#94a3b8', // slate-400
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mainLayout: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#f8fafc', // slate-50
    padding: 30,
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0', // slate-200
    minHeight: '100%',
  },
  rightColumn: {
    width: '65%',
    padding: 30,
    paddingLeft: 25,
  },
  sectionTitleLeft: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
  },
  sectionTitleRight: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
  },
  contactItem: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 6,
  },
  text: {
    color: '#334155',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  dates: {
    fontSize: 9,
    color: '#64748b',
  },
  role: {
    fontSize: 10,
    color: '#2563eb', // blue-600
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionPoint: {
    fontSize: 9.5,
    color: '#475569',
    marginBottom: 3,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: '#94a3b8',
  },
  skillTag: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    color: '#334155',
    marginBottom: 6,
    marginRight: 6,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

// Helper component for bullet points
const BulletList = ({ text }: { text: string }) => {
  const points = text.split(/\n|•/).filter(p => p.trim() !== '');
  
  if (points.length <= 1 && !text.includes('\n') && !text.includes('•')) {
    return <Text style={styles.descriptionPoint}>{text}</Text>;
  }

  return (
    <View>
      {points.map((point, i) => (
        <View key={i} style={styles.bulletPointContainer}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.descriptionPoint}>{point.trim()}</Text>
        </View>
      ))}
    </View>
  );
};

export const ResumeModern = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header spanning top */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
        {(data.personalInfo.jobTitle) && <Text style={styles.title}>{data.personalInfo.jobTitle}</Text>}
      </View>

      <View style={styles.mainLayout}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitleLeft}>Contact</Text>
            {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.address && <Text style={styles.contactItem}>{data.personalInfo.address}</Text>}
            {data.personalInfo.linkedin && <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>}
          </View>

          {data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitleLeft}>Skills</Text>
              <View style={styles.skillsContainer}>
                 {data.skills.map((skill, i) => (
                    <Text key={i} style={styles.skillTag}>{skill}</Text>
                 ))}
              </View>
            </View>
          )}

        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitleRight}>Profile</Text>
              <Text style={styles.text}>{data.summary}</Text>
            </View>
          )}

          {data.workExperience.some(exp => exp.company || exp.role) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitleRight}>Experience</Text>
              {data.workExperience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.company}>{exp.company}</Text>
                      <Text style={styles.dates}>
                        {exp.startDate} {(exp.startDate || exp.endDate) && '-'} {exp.endDate}
                      </Text>
                    </View>
                    {exp.role && <Text style={styles.role}>{exp.role}</Text>}
                    {exp.description && <BulletList text={exp.description} />}
                  </View>
                );
              })}
            </View>
          )}

          {data.education.some(edu => edu.institution || edu.degree) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitleRight}>Education</Text>
              {data.education.map((edu) => {
                if (!edu.institution && !edu.degree) return null;
                return (
                  <View key={edu.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.company}>{edu.institution}</Text>
                      <Text style={styles.dates}>{edu.graduationYear}</Text>
                    </View>
                    {edu.degree && <Text style={styles.role}>{edu.degree}</Text>}
                  </View>
                );
              })}
            </View>
          )}

        </View>
      </View>

    </Page>
  </Document>
);
