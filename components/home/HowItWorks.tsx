'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'

const steps = [
  {
    number: '01',
    title: 'Browse Clubs',
    bullets: [
      'Explore Secondary ANS clubs',
      'Filter by year',
      'Find activities that match your interests',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    gradient: 'from-brand-pink to-brand-purple',
    glow: 'shadow-brand-pink/30',
  },
  {
    number: '02',
    title: 'Learn About Clubs',
    bullets: [
      'Read descriptions and meeting schedules',
      'See who leads each club',
      'Check requirements before joining',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: 'from-brand-purple to-brand-blue',
    glow: 'shadow-brand-purple/30',
  },
  {
    number: '03',
    title: 'Join Instantly',
    bullets: [
      'Submit your student ID',
      'Answer required questions',
      'Quick registration to start',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-brand-blue to-emerald-500',
    glow: 'shadow-brand-blue/30',
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-pink/5 blur-[100px]" />
      
      <Container className="relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-medium mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Getting involved in extracurricular activities has never been easier. 
            Follow these three simple steps to join a club.
          </motion.p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.67%-30px)] right-[calc(16.67%-30px)] h-[2px]">
            <div className="h-full bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue opacity-30" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="group relative p-8 rounded-2xl bg-brand-navy/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                  {/* Glow on hover */}
                  <div className={`absolute -inset-px rounded-2xl bg-gradient-to-b ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-6 shadow-lg ${step.glow} group-hover:scale-105 transition-transform`}>
                      {step.icon}
                      {/* Number badge */}
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-deep border-2 border-brand-navy flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-brand-purple transition-all">
                      {step.title}
                    </h3>
                    <ul className="text-white/60 leading-relaxed space-y-2 list-none">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brand-pink w-4 shrink-0 text-center">•</span>
                          <span className="flex-1 min-w-0">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70">No sign-up required</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <svg className="w-4 h-4 text-brand-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white/70">Takes under 1 minute</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="text-white/70">Just your Student ID</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
