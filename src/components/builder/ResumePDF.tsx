"use client";

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/store/useResumeStore';

// Register a standard font. Note: For production with specific languages, 
// you may need to register external TTF files providing full unicode support.
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
  ]
});

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#334155', // slate-700
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0', // slate-200
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0f172a', // slate-900
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: '#2563eb', // blue-600
    marginBottom: 8,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 10,
    color: '#64748b', // slate-500
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a',
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9', // slate-100
  },
  text: {
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    fontWeight: 600,
    color: '#0f172a',
  },
  dates: {
    fontSize: 10,
    color: '#64748b',
  },
  role: {
    fontSize: 11,
    fontWeight: 600,
    color: '#475569',
    marginBottom: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 9,
    color: '#334155',
  }
});

// The actual PDF Component
export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
        <Text style={styles.title}>{data.personalInfo.jobTitle || 'Your Job Title'}</Text>
        <View style={styles.contact}>
          {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
          {data.personalInfo.address && <Text>• {data.personalInfo.address}</Text>}
          {data.personalInfo.linkedin && <Text>• {data.personalInfo.linkedin}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.workExperience.some(exp => exp.company || exp.role) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.workExperience.map((exp) => {
            if (!exp.company && !exp.role) return null;
            return (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.dates}>
                    {exp.startDate} {exp.startDate && exp.endDate && '-'} {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.role}>{exp.role}</Text>
                {exp.description && <Text style={styles.text}>{exp.description}</Text>}
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
                <Text style={styles.role}>{edu.degree}</Text>
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
