"use client";

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/store/useResumeStore';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 60,
    paddingRight: 60,
    fontSize: 10,
    color: '#111111',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 15,
  },
  name: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#000000',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: '#555555',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    fontSize: 9,
    color: '#666666',
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: '#444444',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  text: {
    color: '#333333',
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    fontWeight: 'normal',
    color: '#000000',
  },
  dates: {
    fontSize: 9,
    color: '#888888',
  },
  role: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 6,
  },
  descriptionPoint: {
    fontSize: 9.5,
    color: '#555555',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    fontSize: 10,
    color: '#333333',
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
          <Text style={styles.bulletPoint}>-</Text>
          <Text style={styles.descriptionPoint}>{point.trim()}</Text>
        </View>
      ))}
    </View>
  );
};

export const ResumeMinimal = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
        {(data.personalInfo.jobTitle) && <Text style={styles.title}>{data.personalInfo.jobTitle}</Text>}
        
        <View style={styles.contactContainer}>
          {data.personalInfo.email && <Text style={styles.contactItem}>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
          {data.personalInfo.address && <Text style={styles.contactItem}>{data.personalInfo.address}</Text>}
          {data.personalInfo.linkedin && <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>}
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
                <Text key={i} style={styles.skillTag}>
                  {skill}{i < data.skills.length - 1 ? '  /  ' : ''}
                </Text>
             ))}
          </View>
        </View>
      )}

    </Page>
  </Document>
);
