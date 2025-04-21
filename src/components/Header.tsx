
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, LogIn, LogOut } from "lucide-react";
import { AuthContext } from "@/App";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-40 animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Menu className="h-6 w-6 text-primary" />
          <Link to="/" className="font-bold text-xl tracking-tight text-primary hover:text-primary/90">
            Quick Task Glance
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-muted-foreground hover:text-primary transition">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
