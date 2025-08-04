// home.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface CountyStat {
  number: string;
  label: string;
}

interface CountyInfo {
  title: string;
  items: string[];
}

interface BackgroundImage {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  
  // Background images for hero section
  backgroundImages: BackgroundImage[] = [
    {
      url: 'https://i0.wp.com/safaris.starwoodhotelskenya.com/wp-content/uploads/2018/04/castle.jpg?fit=1024%2C608&ssl=1',
      alt: 'Modern technology and development'
    },
    {
      url: 'https://tse3.mm.bing.net/th/id/OIP.0VtBHOEnxFYVUPlKseAS9AHaEo?rs=1&pid=ImgDetMain&o=7&rm=3',
      alt: 'Beautiful landscape and nature'
    },
    {
      url: 'https://tse2.mm.bing.net/th/id/OIP.sL4ms7g-PLeDpIEioOeGHQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      alt: 'Agricultural fields and farming'
    },
    {
      url: 'https://i.ytimg.com/vi/EFYDFGu4btk/maxresdefault.jpg',
      alt: 'Community development and growth'
    },
    {
      url: 'https://www.kenyanews.go.ke/wp-content/uploads/2020/12/DSC_1290.JPG-KERUGOYA-ORGANIC-FARMING-PHOTO-2-1200x630.jpg',
      alt: 'Mountain landscape and scenic beauty'
    }
  ];

  currentImageIndex = 0;
  private slideInterval: any;
  private isVisible = true;
  private observer?: IntersectionObserver;

  features: Feature[] = [
    {
      icon: '📰',
      title: 'County News',
      description: 'Stay updated with the latest news, announcements, and developments happening across Kirinyaga County. Get real-time updates on government initiatives and community events.'
    },
    {
      icon: '🏗️',
      title: 'Development Projects',
      description: 'Track ongoing and planned development projects in your area. Monitor progress, timelines, and impacts of infrastructure, health, education, and agricultural projects.'
    },
    {
      icon: '📋',
      title: 'Tender Opportunities',
      description: 'Access current tender notices and procurement opportunities. Find business opportunities with the county government and download necessary tender documents.'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Get instant answers to your questions about county services, projects, and procedures through our intelligent chatbot assistant available 24/7.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access all services on-the-go with our responsive design. Whether on mobile, tablet, or desktop, enjoy a seamless user experience.'
    },
    {
      icon: '🔔',
      title: 'Real-time Updates',
      description: 'Never miss important announcements. Get notifications about new tenders, project updates, and urgent county communications.'
    }
  ];

  countyStats: CountyStat[] = [
    { number: '610,411', label: 'Population' },
    { number: '5', label: 'Sub-Counties' },
    { number: '25', label: 'Wards' },
    { number: '1,478', label: 'Area (km²)' }
  ];

  countyInfo: CountyInfo[] = [
    {
      title: 'Key Economic Activities',
      items: [
        'Rice farming (Mwea Irrigation Scheme)',
        'Coffee production',
        'Dairy farming',
        'Horticulture',
        'Small-scale manufacturing'
      ]
    },
    {
      title: 'Major Towns',
      items: [
        'Kerugoya (County Headquarters)',
        'Kutus',
        'Kianyaga',
        'Baricho',
        'Sagana'
      ]
    },
    {
      title: 'Development Focus Areas',
      items: [
        'Healthcare improvement',
        'Education enhancement',
        'Infrastructure development',
        'Agricultural modernization',
        'Youth empowerment'
      ]
    },
    {
      title: 'Vision & Mission',
      items: [
        'Prosperous and food-secure county',
        'Quality healthcare for all',
        'Modern infrastructure',
        'Sustainable development',
        'Transparent governance'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.preloadImages();
    this.startSlideshow();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.setupVisibilityObserver();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private preloadImages(): void {
    // Preload all images to prevent loading delays during transitions
    this.backgroundImages.forEach((bgImage, index) => {
      const img = new Image();
      img.src = bgImage.url;
      // Optional: Add error handling
      img.onerror = () => {
        console.warn(`Failed to load background image ${index + 1}: ${bgImage.url}`);
      };
    });
  }

  private startSlideshow(): void {
    // Change image every 5 seconds (5000ms)
    this.slideInterval = setInterval(() => {
      if (this.isVisible) { // Only advance if component is visible
        this.nextImage();
      }
    }, 5000);
  }

  private nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
  }

  private setupVisibilityObserver(): void {
    // Pause slideshow when hero section is not visible (performance optimization)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      
      this.observer.observe(heroSection);
    }
  }

  // Method to manually change to specific image (optional - for future indicator dots)
  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  // Method to pause/resume slideshow on hover (optional)
  pauseSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  resumeSlideshow(): void {
    this.startSlideshow();
  }

  private initializeAnimations(): void {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe feature cards and info cards
    const cards = document.querySelectorAll('.feature-card, .info-card');
    cards.forEach(card => {
      const cardElement = card as HTMLElement;
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(30px)';
      cardElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
}