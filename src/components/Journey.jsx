import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, Heart, Play } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCarousel from './MobileCarousel';

const API_BASE_URL = 'https://ian-cares-backend.vercel.app';

const Journey = () => {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/journey`);
                setStories(response.data);
            } catch (error) {
                console.error('Error fetching stories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    const getImageUrl = (path) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';

        // YouTube
        if (url.includes('youtube.com/watch?v=')) {
            const id = new URL(url).searchParams.get('v');
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes('youtu.be/')) {
            const id = url.split('/').pop().split('?')[0];
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes('youtube.com/embed/')) {
            return url;
        }

        // Vimeo
        if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
            const id = url.split('/').pop().split('?')[0];
            return `https://player.vimeo.com/video/${id}`;
        }

        // Facebook
        if (url.includes('facebook.com/') && (url.includes('/videos/') || url.includes('/watch/'))) {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
        }

        // Instagram
        if (url.includes('instagram.com/p/') || url.includes('instagram.com/reels/') || url.includes('instagram.com/reel/')) {
            const baseUrl = url.split('?')[0];
            return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}embed/`;
        }

        // TikTok
        if (url.includes('tiktok.com/') && url.includes('/video/')) {
            const id = url.split('/video/')[1].split('?')[0];
            return `https://www.tiktok.com/embed/v2/${id}`;
        }

        return url;
    };

    const isDirectVideoFile = (url) => {
        if (!url) return false;
        const cleanUrl = url.split('?')[0].toLowerCase();
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
        return videoExtensions.some(ext => cleanUrl.endsWith(ext)) || url.includes('/video/upload/');
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-[#E8F6FD]">
            <Navbar />

            {/* Hero Section - Contained and Illustrated */}
            <section className="relative pt-24 md:pt-32 pb-12 px-4 md:px-6">
                <div className="max-w-[1600px] mx-auto relative h-[60vh] md:h-[75vh] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] md:rounded-tr-[12rem] shadow-2xl group">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <motion.img
                            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000&auto=format&fit=crop"
                            alt="Journey Hero"
                            className="w-full h-full object-cover"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-8 inline-block border border-white/30">
                                Real Stories, Real Hope
                            </span>
                            <h1 className="text-4xl md:text-8xl font-bold text-white mb-8 leading-[1.1] drop-shadow-lg">
                                Personal Growth <br /> Stories
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-50 leading-relaxed max-w-2xl mb-10 drop-shadow-md">
                                Discover how real people rebuilt their lives through care, courage, and community. Each story reflects our belief that healing is possible.
                            </p>
                            <a
                                href="#stories"
                                className="bg-[#1A6B96] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#155a82] transition-all inline-flex items-center gap-2 w-fit"
                            >
                                Read All Stories <ArrowRight size={20} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stories Section */}
            <section id="stories" className="py-24 px-6 bg-white/50 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1A6B96] mb-4">Journey</h2>
                        <div className="w-20 h-1.5 bg-[#FDB913] mx-auto rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1A6B96]"></div>
                        </div>
                    ) : (
                        <>
                            {/* Mobile Carousel */}
                            <div className="md:hidden grid grid-cols-2 gap-4">
                                {stories.map((story) => (
                                    <motion.div
                                        key={story._id}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer group h-full flex flex-col"
                                        onClick={() => setSelectedStory(story)}
                                    >
                                        {/* Image slice for better layout in grid */}
                                        <div className="relative h-32 overflow-hidden shrink-0">
                                            <img
                                                src={getImageUrl(story.image)}
                                                alt={story.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-2 relative">
                                                <h3 className="text-xs font-bold text-white line-clamp-1 flex items-center gap-1">
                                                    {story.name}
                                                </h3>
                                                {story.videoUrl && (
                                                    <div className="absolute bottom-2 right-2">
                                                        <a
                                                            href={story.videoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-[#1A6B96] shadow-lg"
                                                            title="Watch Video"
                                                        >
                                                            <Play size={12} fill="currentColor" className="ml-0.5" />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 flex-grow flex flex-col">
                                            <p className="text-slate-600 leading-tight mb-2 text-[10px] line-clamp-2">
                                                {story.shortDescription}
                                            </p>
                                            <div className="mt-auto text-[#1A6B96] font-bold text-[10px] flex items-center gap-1">
                                                Read <ArrowRight size={10} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Desktop Grid */}
                            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {stories.map((story, index) => (
                                    <motion.div
                                        key={story._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10 }}
                                        className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer group"
                                        onClick={() => setSelectedStory(story)}
                                    >
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={getImageUrl(story.image)}
                                                alt={story.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                            {story.videoUrl && (
                                                <div className="absolute bottom-4 right-4 z-10">
                                                    <a
                                                        href={story.videoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1A6B96] shadow-xl transform hover:scale-110 transition-all border border-white/20"
                                                        title="Watch Video"
                                                    >
                                                        <Play size={24} fill="currentColor" className="ml-1" />
                                                    </a>
                                                </div>
                                            )}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                                    <Calendar size={14} />
                                                    <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <p className="text-slate-600 leading-relaxed mb-4">
                                                {story.shortDescription}
                                            </p>
                                            <button className="text-[#1A6B96] font-bold flex items-center gap-2 hover:gap-3 transition-all group-hover:text-[#FDB913]">
                                                Read More <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Story Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Image or Video */}
                            <div className="relative h-80 overflow-hidden rounded-t-3xl bg-slate-100">
                                {selectedStory.videoUrl ? (
                                    isDirectVideoFile(selectedStory.videoUrl) ? (
                                        <video
                                            src={selectedStory.videoUrl.startsWith('http') ? selectedStory.videoUrl : `${API_BASE_URL}${selectedStory.videoUrl}`}
                                            controls
                                            className="w-full h-full object-contain bg-black"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <iframe
                                            src={getEmbedUrl(selectedStory.videoUrl)}
                                            title={selectedStory.name}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )
                                ) : (
                                    <img
                                        src={getImageUrl(selectedStory.image)}
                                        alt={selectedStory.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                                    <h2 className="text-4xl font-bold text-white mb-2">{selectedStory.name}</h2>
                                    <div className="flex items-center gap-2 text-white/90">
                                        <Calendar size={16} />
                                        <span>{new Date(selectedStory.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12">
                                <div className="prose prose-lg max-w-none">
                                    {selectedStory.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="text-slate-700 leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#1A6B96] rounded-full flex items-center justify-center text-white">
                                            <Heart size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1A6B96]">Ian Cares Foundation</p>
                                            <p className="text-sm text-slate-500">Healing Minds with Heart</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Journey;
