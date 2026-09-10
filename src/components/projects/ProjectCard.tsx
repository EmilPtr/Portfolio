import React, { useState, useEffect } from 'react';
import type { ProjectData } from './projectsData';
import { ExternalLink, MonitorPlay, Code2, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
}

type TabType = 'video' | 'github' | 'images';

interface GithubInfo {
  repoName: string;
  description: string;
  stars: number;
  language: string;
  recentCommit: string;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = !!project.image;
  
  const [activeTab, setActiveTab] = useState<TabType>(
    hasImage ? 'images' : project.video ? 'video' : 'github'
  );

  const [githubData, setGithubData] = useState<GithubInfo | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);

  useEffect(() => {
    if (!project.githubUrl) return;

    const fetchGithubData = async () => {
      try {
        setGithubLoading(true);
        const urlParts = project.githubUrl!.split('github.com/');
        if (urlParts.length !== 2) return;
        
        const repoPath = urlParts[1].replace(/\/$/, ''); // owner/repo
        
        const response = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (!response.ok) return;
        
        const data = await response.json();
        
        // Fetch recent commit date
        const commitsResponse = await fetch(`https://api.github.com/repos/${repoPath}/commits?per_page=1`);
        let recentCommit = data.updated_at ? new Date(data.updated_at).toLocaleDateString() : 'Unknown';
        
        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          if (commits && commits.length > 0) {
            recentCommit = new Date(commits[0].commit.author.date).toLocaleDateString();
          }
        }

        setGithubData({
          repoName: data.name,
          description: data.description || 'No description provided.',
          stars: data.stargazers_count,
          language: data.language || 'Multiple',
          recentCommit
        });
      } catch (err) {
        console.error('Error fetching github data:', err);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGithubData();
  }, [project.githubUrl]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 border-2 border-red-500/50 bg-black/40 backdrop-blur-md relative overflow-hidden font-mono crt-text">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500" />

      {/* Left Panel (~35%) */}
      <div className="w-full md:w-[35%] flex flex-col justify-start z-10 space-y-6 border-b-2 md:border-b-0 md:border-r-2 border-white/20 pb-6 md:pb-0 md:pr-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-red-400">{project.title}</h2>
          </div>
          {project.subtitle && <h3 className="text-sm text-white mb-4">{project.subtitle}</h3>}
          <p className="text-sm text-white/80 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span key={tech} className="text-xs px-2 py-1 bg-white/10 border-2 border-white/20 text-white">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right Panel (~65%) */}
      <div className="w-full md:w-[65%] border-2 border-white/20 bg-black/60 p-4 flex flex-col z-10 relative">
        {/* Media Selector */}
        <div className="flex gap-4 border-b-2 border-white/20 pb-4 mb-4 text-xs font-bold">
          {project.video && (
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 ${activeTab === 'video' ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
            >
              <MonitorPlay size={14} /> VIDEO
            </button>
          )}
          {project.githubUrl && (
            <button 
              onClick={() => setActiveTab('github')}
              className={`flex items-center gap-2 ${activeTab === 'github' ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
            >
              <Code2 size={14} /> REPO
            </button>
          )}
          {hasImage && (
            <button 
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 ${activeTab === 'images' ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
            >
              <ImageIcon size={14} /> IMAGE
            </button>
          )}
        </div>

        {/* Media Viewer */}
        <div className="flex-1 min-h-[300px] relative overflow-hidden border-2 border-white/10">
          {activeTab === 'video' && project.video && (
            <iframe 
              src={project.video} 
              className="absolute inset-0 w-full h-full object-cover animate-fade-in" 
              allow="autoplay; fullscreen" 
              title={`${project.title} Video`}
            />
          )}
          
          {activeTab === 'github' && project.githubUrl && (
            <div className="absolute inset-0 p-6 bg-[#0a0a0a] font-mono animate-fade-in flex flex-col justify-center">
              {githubLoading ? (
                <div className="text-white/50 text-center animate-pulse">FETCHING REPO DATA...</div>
              ) : githubData ? (
                <>
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Code2 size={18} />
                    <span className="text-lg font-bold">{githubData.repoName}</span>
                  </div>
                  <p className="text-white/70 text-sm mb-6">{githubData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-white/50 block mb-1">Language</span>
                      <span className="text-blue-400 font-bold">{githubData.language}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block mb-1">Stars</span>
                      <span className="text-yellow-400 font-bold">{githubData.stars}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-white/50 block mb-1">Latest Commit</span>
                      <span className="text-green-400 font-bold">{githubData.recentCommit}</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-block border-2 border-white/20 px-4 py-2 text-xs hover:border-red-500 hover:text-red-400 transition-colors">
                      OPEN REPOSITORY
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-red-500 text-center">ERROR FETCHING REPO DATA</div>
              )}
            </div>
          )}

          {activeTab === 'images' && hasImage && (
            <ImageGallery images={[project.image!]} />
          )}
        </div>
      </div>
    </div>
  );
}

function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="absolute inset-0 flex flex-col animate-fade-in">
      <div className={`flex-1 relative bg-black/50 flex items-center justify-center overflow-hidden ${images.length > 1 ? 'mb-2 border-2 border-white/20' : ''}`}>
        {images[currentIndex].includes('drive.google.com') ? (
          <iframe 
            src={images[currentIndex]} 
            className="w-full h-full object-contain" 
            allow="autoplay; fullscreen"
          />
        ) : (
          <img src={images[currentIndex]} alt="Project screenshot" className="w-full h-full object-contain" />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 h-16">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`flex-1 relative border-2 ${currentIndex === idx ? 'border-red-500' : 'border-white/20 hover:border-white/50'}`}
            >
              {img.includes('drive.google.com') ? (
                <div className="w-full h-full bg-white/10 flex items-center justify-center opacity-60 hover:opacity-100 text-[10px]">DRIVE IMG</div>
              ) : (
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover opacity-60 hover:opacity-100" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}