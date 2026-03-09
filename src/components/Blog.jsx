import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, User, Tag, Play } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCarousel from './MobileCarousel';

const API_BASE_URL = 'https://ian-cares-backend.vercel.app';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/blog`);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const getImageUrl = (path) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        }
        if (url.includes('youtu.be/')) {
            const id = url.split('/').pop();
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
            const id = url.split('/').pop();
            return `https://player.vimeo.com/video/${id}`;
        }
        return url;
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
                            src="https://res.cloudinary.com/dzzhtglaj/image/upload/q_auto/f_auto/v1772446171/ian_cares_foundation/blog2.png"
                            alt="Blog Hero"
                            className="w-full h-full object-cover"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <span className="bg-white/20 backdrop-blur-md text-white px-5 pt-1.2 pb-2 rounded-full text-sm font-bold tracking-wider uppercase mb-5 inline-block border border-white/30 shadow-lg mt-12 md:mt-0 shadow-white/5">
                                Knowledge & Wellness
                            </span>
                            <h1 className="text-4xl md:text-8xl font-bold text-white mb-4 leading-[1.1] drop-shadow-lg">
                                Insights & <br /> Inspirations
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-50 leading-relaxed max-w-2xl mb-6 drop-shadow-md">
                                Stay informed with articles on addiction recovery, emotional wellness, and real-life healing experiences.
                            </p>
                            <a
                                href="#blog"
                                className="bg-[#1A6B96] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#155a82] transition-all inline-flex items-center gap-2 w-fit"
                            >
                                Visit Blog <ArrowRight size={20} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Blog Listing Section */}
            <section id="blog" className="py-24 px-6 bg-white/50 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1A6B96] mb-4">Blogs</h2>
                        <div className="w-20 h-1.5 bg-[#FDB913] mx-auto rounded-full mb-12"></div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1A6B96]"></div>
                        </div>
                    ) : (
                        <>
                            {/* Featured / Newly Added Blog */}
                            {blogs.length > 0 && (
                                <div className="mb-20">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="bg-[#1A6B96] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Newly Added</span>
                                        <div className="h-[1px] bg-slate-200 flex-grow"></div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col lg:flex-row cursor-pointer hover:shadow-3xl transition-all group"
                                        onClick={() => setSelectedBlog(blogs[0])}
                                    >
                                        <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden relative group">
                                            <img
                                                src={getImageUrl(blogs[0].image)}
                                                alt={blogs[0].title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {blogs[0].videoUrl && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-[#1A6B96] shadow-xl transform group-hover:scale-110 transition-transform">
                                                        <Play size={32} fill="currentColor" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={16} className="text-[#1A6B96]" />
                                                    <span>{new Date(blogs[0].createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={16} className="text-[#1A6B96]" />
                                                    <span>Staff</span>
                                                </div>
                                            </div>
                                            <h3 className="text-2xl md:text-4xl font-bold text-[#1A6B96] mb-6 group-hover:text-[#FDB913] transition-colors leading-tight">
                                                {blogs[0].title}
                                            </h3>
                                            <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                                                {blogs[0].expert}
                                            </p>
                                            <button className="text-[#1A6B96] font-bold text-lg flex items-center gap-2 hover:gap-3 transition-all group-hover:text-[#FDB913]">
                                                Read Full Article <ArrowRight size={24} />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Other Blogs Section */}
                            <div className="flex items-center gap-4 mb-12">
                                <h3 className="text-xl md:text-3xl font-bold text-[#1A6B96]/80 whitespace-nowrap">Latest Blogs</h3>
                                <div className="h-[1px] bg-slate-200 flex-grow"></div>
                            </div>

                            {/* Responsive Blog Grid */}
                            <div className="grid grid-cols-2 gap-4 md:gap-8">
                                {blogs.slice(1).map((blog, index) => (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10 }}
                                        className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer group flex flex-col h-full"
                                        onClick={() => setSelectedBlog(blog)}
                                    >
                                        {/* Featured Image */}
                                        <div className="relative h-48 md:h-64 overflow-hidden shrink-0">
                                            <img
                                                src={getImageUrl(blog.image)}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                            {blog.videoUrl && (
                                                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-all">
                                                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#1A6B96] shadow-lg transform group-hover:scale-110 transition-transform">
                                                        <Play size={20} fill="currentColor" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute top-2 left-2 md:top-4 md:left-4">
                                                <span className="bg-[#FDB913] text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                                    Updates
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 md:p-6 flex-grow flex flex-col">
                                            <div className="hidden md:flex items-center gap-4 text-sm text-slate-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={14} />
                                                    <span>Staff</span>
                                                </div>
                                            </div>

                                            <h3 className="text-sm md:text-2xl font-bold text-[#1A6B96] mb-2 md:mb-3 group-hover:text-[#FDB913] transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="hidden md:block text-slate-600 leading-relaxed mb-4 line-clamp-3">
                                                {blog.expert}
                                            </p>

                                            <div className="mt-auto">
                                                <button className="text-[#1A6B96] font-bold text-xs md:text-base flex items-center gap-2 hover:gap-3 transition-all group-hover:text-[#FDB913]">
                                                    Read More <ArrowRight size={16} className="md:w-5 md:h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Blog Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedBlog(null)}
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
                                onClick={() => setSelectedBlog(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            {/* Featured Image or Video */}
                            <div className="relative h-80 overflow-hidden rounded-t-3xl bg-slate-100">
                                {selectedBlog.videoUrl ? (
                                    selectedBlog.videoUrl.includes('youtube.com') ||
                                        selectedBlog.videoUrl.includes('youtu.be') ||
                                        selectedBlog.videoUrl.includes('vimeo.com') ||
                                        selectedBlog.videoUrl.includes('embed') ? (
                                        <iframe
                                            src={getEmbedUrl(selectedBlog.videoUrl)}
                                            title={selectedBlog.title}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video
                                            src={selectedBlog.videoUrl.startsWith('http') ? selectedBlog.videoUrl : `${API_BASE_URL}${selectedBlog.videoUrl}`}
                                            controls
                                            className="w-full h-full object-contain bg-black"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                ) : (
                                    <img
                                        src={getImageUrl(selectedBlog.image)}
                                        alt={selectedBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute top-8 left-8">
                                    <span className="bg-[#FDB913] text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                                        Updates
                                    </span>
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                                    <h2 className="text-4xl font-bold text-white mb-4">{selectedBlog.title}</h2>
                                    <div className="flex items-center gap-4 text-white/90">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>{new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User size={16} />
                                            <span>Staff</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12">
                                <div className="prose prose-lg max-w-none">
                                    {selectedBlog.content.split('\n\n').map((paragraph, index) => {
                                        // Check if it's a heading
                                        if (paragraph.startsWith('## ')) {
                                            return (
                                                <h2 key={index} className="text-2xl font-bold text-[#1A6B96] mt-8 mb-4">
                                                    {paragraph.replace('## ', '')}
                                                </h2>
                                            );
                                        }
                                        return (
                                            <p key={index} className="text-slate-700 leading-relaxed mb-6">
                                                {paragraph}
                                            </p>
                                        );
                                    })}
                                </div>

                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#1A6B96] rounded-full flex items-center justify-center text-white font-bold">
                                                S
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#1A6B96]">Staff</p>
                                                <p className="text-sm text-slate-500">Contributor</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Tag size={16} />
                                            <span className="text-sm">Updates</span>
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

export default Blog;
