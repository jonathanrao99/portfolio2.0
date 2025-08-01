# Video Setup Instructions

## Required Video Files

To complete your portfolio, you'll need to add the following video files:

### 1. Hero Video
**Location**: `/public/videos/hero-video.mp4`

**Requirements**:
- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds, looping
- **Format**: MP4
- **Content**: Something that represents your work - could be:
  - Code being written
  - Design process
  - Data visualization
  - Abstract patterns
  - Your workspace

**Recommendations**:
- Keep file size under 10MB for fast loading
- Use smooth, subtle movements
- Avoid text or logos that might be hard to read
- Consider using a gradient overlay for better text readability

### 2. Project Preview Videos
**Location**: `/public/videos/swiftguard-preview.mp4` (and others as needed)

**Requirements**:
- **Resolution**: 1920x1080 (16:9 aspect ratio)
- **Duration**: 5-15 seconds
- **Format**: MP4
- **Content**: Brief preview of your project

**Examples**:
- App interface walkthrough
- Website interactions
- Data visualization animations
- Before/after comparisons

## Video Creation Tools

### Free Options:
1. **Screen Recording**: OBS Studio, ShareX, QuickTime
2. **Video Editing**: DaVinci Resolve, OpenShot
3. **Online**: Canva, Kapwing

### Paid Options:
1. **Adobe Creative Suite**: Premiere Pro, After Effects
2. **Final Cut Pro**: Mac only
3. **Camtasia**: Screen recording and editing

## Video Optimization

### Compression Tips:
1. **Use H.264 codec** for best compatibility
2. **Target bitrate**: 2-5 Mbps for 1080p
3. **Frame rate**: 24-30 fps
4. **Audio**: Remove or keep very low volume

### Online Tools:
- **HandBrake**: Free video compression
- **FFmpeg**: Command-line video processing
- **Online compressors**: CloudConvert, YouCompress

## Current Status

Currently, the portfolio uses placeholder files:
- `hero-video.mp4` - Shows a gradient fallback
- `swiftguard-preview.mp4` - Placeholder for project video

## Testing

After adding your videos:
1. Refresh the page
2. Check that videos load properly
3. Test on different devices and browsers
4. Verify loading performance

## Fallback

If videos fail to load, the portfolio gracefully falls back to:
- Gradient backgrounds for hero section
- Static images for project previews
- No broken links or errors 