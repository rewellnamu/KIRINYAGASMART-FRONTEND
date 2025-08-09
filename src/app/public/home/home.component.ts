import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  backgroundImages: BackgroundImage[] = [
    { url: 'https://i0.wp.com/safaris.starwoodhotelskenya.com/wp-content/uploads/2018/04/castle.jpg?fit=1024%2C608&ssl=1', alt: 'Modern technology and development' },
    { url: 'https://tse3.mm.bing.net/th/id/OIP.0VtBHOEnxFYVUPlKseAS9AHaEo?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Beautiful landscape and nature' },
    { url: 'https://tse2.mm.bing.net/th/id/OIP.sL4ms7g-PLeDpIEioOeGHQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Agricultural fields and farming' },
    { url: 'https://i.ytimg.com/vi/EFYDFGu4btk/maxresdefault.jpg', alt: 'Community development and growth' },
    { url: 'https://www.kenyanews.go.ke/wp-content/uploads/2020/12/DSC_1290.JPG-KERUGOYA-ORGANIC-FARMING-PHOTO-2-1200x630.jpg', alt: 'Mountain landscape and scenic beauty' }
  ];

  currentImageIndex = 0;
  private slideInterval: any;
  private isVisible = true;
  private observer?: IntersectionObserver;

  features: Feature[] = [
    { icon: '📰', title: 'County News', description: 'Stay updated with the latest news...' },
    { icon: '🏗️', title: 'Development Projects', description: 'Track ongoing and planned projects...' },
    { icon: '📋', title: 'Tender Opportunities', description: 'Access current tender notices...' },
    { icon: '🤖', title: 'AI Assistant', description: 'Get instant answers from our chatbot...' },
    { icon: '📱', title: 'Mobile Friendly', description: 'Access services on any device...' },
    { icon: '🔔', title: 'Real-time Updates', description: 'Get notifications for new updates...' }
  ];

  countyStats: CountyStat[] = [
    { number: '610,411', label: 'Population' },
    { number: '5', label: 'Sub-Counties' },
    { number: '25', label: 'Wards' },
    { number: '1,478', label: 'Area (km²)' }
  ];

  countyInfo: CountyInfo[] = [
    { title: 'Key Economic Activities', items: ['Rice farming', 'Coffee production', 'Dairy farming', 'Horticulture', 'Manufacturing'] },
    { title: 'Major Towns', items: ['Kerugoya', 'Kutus', 'Kianyaga', 'Baricho', 'Sagana'] },
    { title: 'Development Focus Areas', items: ['Healthcare', 'Education', 'Infrastructure', 'Agriculture', 'Youth empowerment'] },
    { title: 'Vision & Mission', items: ['Prosperity', 'Healthcare for all', 'Infrastructure', 'Sustainable development', 'Transparent governance'] }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.preloadImages();
      this.startSlideshow();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnimations();
      this.setupVisibilityObserver();
    }
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
    this.backgroundImages.forEach((bgImage, index) => {
      const img = new Image();
      img.src = bgImage.url;
      img.onerror = () => {
        console.warn(`Failed to load background image ${index + 1}: ${bgImage.url}`);
      };
    });
  }

  private startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      if (this.isVisible) {
        this.nextImage();
      }
    }, 5000);
  }

  private nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
  }

  private setupVisibilityObserver(): void {
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

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  pauseSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  resumeSlideshow(): void {
    this.startSlideshow();
  }

  private initializeAnimations(): void {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

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
