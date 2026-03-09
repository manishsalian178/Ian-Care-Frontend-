import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ZoomIn, Play } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCarousel from './MobileCarousel';

const API_BASE_URL = 'https://ian-cares-backend.vercel.app';

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/gallery`);
                setGalleryImages(response.data);
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const getImageUrl = (path) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-[#FFFBF5]">
            <Navbar />

            {/* Hero Section - Contained and Illustrated */}
            <section className="relative pt-24 md:pt-32 pb-12 px-4 md:px-6">
                <div className="max-w-[1600px] mx-auto relative h-[60vh] md:h-[75vh] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] md:rounded-tr-[12rem] shadow-2xl group">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <motion.img
                            src="https://res.cloudinary.com/dzzhtglaj/image/upload/q_auto/f_auto/v1772521323/gallarybackground_et760a.avif"
                            alt="Gallery Hero"
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
                            <h1 className="text-4xl md:text-8xl font-bold text-white mb-12 leading-[1.1] drop-shadow-lg">
                                Gallery & <br /> Moments
                            </h1>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section id="gallery" className="py-24 px-6 bg-white/50 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1A6B96] mb-4">Gallery</h2>
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
                                {galleryImages.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 cursor-pointer group aspect-square"
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                                            <span className="text-[#FDB913] text-[8px] font-bold uppercase tracking-wider mb-0.5 block">
                                                {item.category}
                                            </span>
                                            <h3 className="text-white text-[10px] font-bold line-clamp-1 flex items-center gap-1">
                                                {item.videoUrl && <Play size={8} className="fill-current" />}
                                                {item.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Desktop Grid */}
                            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <AnimatePresence mode="popLayout">
                                    {galleryImages.map((item, index) => (
                                        <motion.div
                                            key={item._id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05 }}
                                            className={`relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 cursor-pointer group ${index % 7 === 0 || index % 7 === 3 ? 'md:row-span-2' : ''
                                                }`}
                                            onClick={() => setSelectedImage(item)}
                                        >
                                            {/* Image */}
                                            <img
                                                src={getImageUrl(item.image)}
                                                alt={item.title}
                                                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${index % 7 === 0 || index % 7 === 3 ? 'h-full min-h-[400px]' : 'h-64'
                                                    }`}
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <span className="text-[#FDB913] text-xs font-bold uppercase tracking-wider mb-2 block">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                                                    <div className="flex items-center gap-2 text-white">
                                                        {item.videoUrl ? <Play size={18} className="fill-current" /> : <ZoomIn size={18} />}
                                                        <span className="text-sm">{item.videoUrl ? 'Click to play video' : 'Click to view'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Image/Video Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-6xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Media Content */}
                            <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[50vh]">
                                {selectedImage.videoUrl ? (
                                    selectedImage.videoUrl.includes('youtube') || selectedImage.videoUrl.includes('vimeo') || selectedImage.videoUrl.includes('embed') ? (
                                        <iframe
                                            src={selectedImage.videoUrl}
                                            title={selectedImage.title}
                                            className="w-full aspect-video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video
                                            src={selectedImage.videoUrl.startsWith('http') ? selectedImage.videoUrl : `${API_BASE_URL}${selectedImage.videoUrl}`}
                                            controls
                                            autoPlay
                                            className="w-full max-h-[80vh]"
                                        ></video>
                                    )
                                ) : (
                                    <img
                                        src={getImageUrl(selectedImage.image)}
                                        alt={selectedImage.title}
                                        className="w-full max-h-[80vh] object-contain"
                                    />
                                )}

                                {/* Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 pointer-events-none">
                                    <span className="text-[#FDB913] text-sm font-bold uppercase tracking-wider mb-2 block">
                                        {selectedImage.category}
                                    </span>
                                    <h2 className="text-white text-3xl font-bold">{selectedImage.title}</h2>
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

export default Gallery;
