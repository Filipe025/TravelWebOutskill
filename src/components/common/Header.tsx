import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ui/ThemeToggle';
import { AnimatedNavbar } from '../ui/AnimatedNavbar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <AnimatedNavbar />
      <header className="bg-background border-b border-border shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="w-8 h-8 text-sky-500" />
            <span className="text-xl font-bold text-foreground">TravelEase</span>
          </Link>

          {/* Desktop Navigation - Spacer */}
          <div className="hidden md:flex"></div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-sky-500"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link
                to="/recommendations"
                className="block px-3 py-2 text-muted-foreground hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Books & Movies
              </Link>
              <Link
                to="/visa-info"
                className="block px-3 py-2 text-muted-foreground hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Visa Information
              </Link>
              <Link
                to="/currency-converter"
                className="block px-3 py-2 text-muted-foreground hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Currency Converter
              </Link>
              
              <div className="border-t pt-4">
                <div className="px-3 py-2">
                  <ThemeToggle />
                </div>
              </div>
              
              {user ? (
                <div className="border-t pt-4">
                  <div className="px-3 py-2 text-foreground font-medium">
                    Welcome, {user.name}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-muted-foreground hover:text-sky-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-sky-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t pt-4 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-muted-foreground hover:text-sky-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors mx-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
}