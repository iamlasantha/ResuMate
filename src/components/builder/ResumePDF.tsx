"use client";

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/store/useResumeStore';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 10,
    color: '#333333',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 24,
    textAlign: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    color: '#2563eb', // Primary Blue Accent
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 9,
    color: '#4b5563',
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db', // subtle gray line
  },
  text: {
    color: '#374151',
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    fontWeight: 700,
    color: '#111827',
  },
  dates: {
    fontSize: 9,
    color: '#6b7280',
  },
  role: {
    fontSize: 10,
    fontWeight: 600,
    color: '#2563eb',
    marginBottom: 4,
  },
  descriptionPoint: {
    fontSize: 9.5,
    color: '#4b5563',
    marginBottom: 3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    color: '#374151',
    fontWeight: 600,
  }
});

// Helper component for bullet points
const BulletList = ({ text }: { text: string }) => {
  // Split by newlines or actual bullet characters
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

// The actual PDF Component
export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
        {(data.personalInfo.jobTitle) && <Text style={styles.title}>{data.personalInfo.jobTitle}</Text>}
        
        <View style={styles.contactContainer}>
          {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text style={styles.contactItem}>|   {data.personalInfo.phone}</Text>}
          {data.personalInfo.address && <Text style={styles.contactItem}>|   {data.personalInfo.address}</Text>}
          {data.personalInfo.linkedin && <Text style={styles.contactItem}>|   {data.personalInfo.linkedin}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.workExperience.some(exp => exp.company || exp.role) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
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

      {/* Education */}
      {data.education.some(edu => edu.institution || edu.degree) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
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

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
             {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillTag}>{skill}</Text>
             ))}
          </View>
        </View>
      )}

    </Page>
  </Document>
);
