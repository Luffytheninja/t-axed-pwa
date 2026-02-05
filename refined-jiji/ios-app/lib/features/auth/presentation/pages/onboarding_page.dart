import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingItem> _items = [
    OnboardingItem(
      title: 'Discover Amazing Deals',
      description: 'Find quality items from trusted sellers in your area with AI-powered recommendations',
      image: 'assets/images/onboarding_1.png',
      color: const Color(0xFFE8F5E8),
    ),
    OnboardingItem(
      title: 'Smart Recommendations',
      description: 'Our AI learns your preferences to show you the most relevant listings',
      image: 'assets/images/onboarding_2.png',
      color: const Color(0xFFFFF3E0),
    ),
    OnboardingItem(
      title: 'Safe & Secure Transactions',
      description: 'Verified sellers, secure payments, and buyer protection guarantee',
      image: 'assets/images/onboarding_3.png',
      color: const Color(0xFFE3F2FD),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          PageView.builder(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() {
                _currentPage = index;
              });
            },
            itemCount: _items.length,
            itemBuilder: (context, index) {
              return OnboardingPageWidget(item: _items[index]);
            },
          ),
          Positioned(
            bottom: 50.h,
            left: 24.w,
            right: 24.w,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    _items.length,
                    (index) => Container(
                      margin: EdgeInsets.symmetric(horizontal: 4.w),
                      width: _currentPage == index ? 24.w : 8.w,
                      height: 8.h,
                      decoration: BoxDecoration(
                        color: _currentPage == index
                            ? Theme.of(context).primaryColor
                            : Colors.grey.shade300,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 32.h),
                Row(
                  children: [
                    if (_currentPage > 0)
                      Expanded(
                        child: TextButton(
                          onPressed: () {
                            _pageController.previousPage(
                              duration: const Duration(milliseconds: 300),
                              curve: Curves.easeInOut,
                            );
                          },
                          child: Text(
                            'Back',
                            style: TextStyle(
                              color: Theme.of(context).primaryColor,
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                    Expanded(
                      flex: 2,
                      child: ElevatedButton(
                        onPressed: () {
                          if (_currentPage == _items.length - 1) {
                            Navigator.pushReplacementNamed(context, '/login');
                          } else {
                            _pageController.nextPage(
                              duration: const Duration(milliseconds: 300),
                              curve: Curves.easeInOut,
                            );
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          padding: EdgeInsets.symmetric(vertical: 16.h),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: Text(
                          _currentPage == _items.length - 1 ? 'Get Started' : 'Next',
                          style: TextStyle(
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class OnboardingItem {
  final String title;
  final String description;
  final String image;
  final Color color;

  OnboardingItem({
    required this.title,
    required this.description,
    required this.image,
    required this.color,
  });
}

class OnboardingPageWidget extends StatelessWidget {
  final OnboardingItem item;

  const OnboardingPageWidget({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: item.color,
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(height: 100.h),
          // Placeholder for image - in real app, use Image.asset
          Container(
            width: 280.w,
            height: 280.h,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.5),
              borderRadius: BorderRadius.circular(140),
            ),
            child: Icon(
              Icons.shopping_bag_outlined,
              size: 120.sp,
              color: Theme.of(context).primaryColor,
            ),
          ),
          SizedBox(height: 48.h),
          Text(
            item.title,
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 16.h),
          Text(
            item.description,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.grey.shade600,
                ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}