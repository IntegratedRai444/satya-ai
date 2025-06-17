#!/usr/bin/env python3
"""
SatyaAI Cyber Intelligence Platform - Python Backend
Production-ready Flask application with comprehensive security features
"""

import os
import sys
from app import app, db

def main():
    """Main application entry point"""
    try:
        # Ensure database tables exist
        with app.app_context():
            db.create_all()
            print("✓ Database initialized successfully")
        
        # Get configuration
        port = int(os.getenv('PORT', 5000))
        host = os.getenv('HOST', '0.0.0.0')
        debug = os.getenv('FLASK_ENV') == 'development'
        
        print(f"🚀 Starting SatyaAI Cyber Intelligence Platform on {host}:{port}")
        print(f"🔧 Debug mode: {'enabled' if debug else 'disabled'}")
        
        # Start the application
        app.run(
            host=host,
            port=port,
            debug=debug,
            threaded=True
        )
        
    except Exception as e:
        print(f"❌ Failed to start application: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()