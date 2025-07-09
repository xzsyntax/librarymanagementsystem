"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "tr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  tr: {
    // Header
    "header.title": "Akıllı Kütüphane Sistemi",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.books": "Kitaplar",
    "nav.members": "Üyeler",
    "nav.borrow": "Ödünç İşlemleri",
    "nav.reports": "Raporlar",

    // Dashboard
    "dashboard.totalBooks": "Toplam Kitap",
    "dashboard.totalMembers": "Toplam Üye",
    "dashboard.borrowedBooks": "Ödünç Verilen",
    "dashboard.availableBooks": "Mevcut Kitap",
    "dashboard.totalBooksDesc": "Kütüphanedeki toplam kitap sayısı",
    "dashboard.totalMembersDesc": "Kayıtlı üye sayısı",
    "dashboard.borrowedBooksDesc": "Şu anda ödünç verilen kitaplar",
    "dashboard.availableBooksDesc": "Ödünç alınabilir kitap sayısı",
    "dashboard.recentActivities": "Son Ödünç İşlemleri",
    "dashboard.recentActivitiesDesc": "En son gerçekleşen ödünç alma işlemleri",
    "dashboard.borrowed": "Ödünç Alındı",
    "dashboard.returned": "İade Edildi",

    // Books
    "books.search": "Kitap ara...",
    "books.allCategories": "Tüm Kategoriler",
    "books.addBook": "Kitap Ekle",
    "books.addNewBook": "Yeni Kitap Ekle",
    "books.addNewBookDesc": "Kütüphaneye yeni bir kitap ekleyin.",
    "books.editBook": "Kitap Düzenle",
    "books.editBookDesc": "Kitap bilgilerini güncelleyin.",
    "books.available": "Mevcut",
    "books.title": "Kitap Adı",
    "books.author": "Yazar",
    "books.isbn": "ISBN",
    "books.category": "Kategori",
    "books.publishYear": "Yayın Yılı",
    "books.totalCopies": "Toplam Kopya",
    "books.availableCopies": "Mevcut Kopya",
    "books.description": "Açıklama",
    "books.selectCategory": "Kategori seç",
    "books.year": "Yıl",

    // Members
    "members.title": "Üye Yönetimi",
    "members.addMember": "Üye Ekle",
    "members.addNewMember": "Yeni Üye Ekle",
    "members.addNewMemberDesc": "Kütüphaneye yeni bir üye ekleyin.",
    "members.editMember": "Üye Düzenle",
    "members.editMemberDesc": "Üye bilgilerini güncelleyin.",
    "members.name": "Ad Soyad",
    "members.email": "E-posta",
    "members.phone": "Telefon",
    "members.membership": "Üyelik",
    "members.status": "Durum",
    "members.active": "Aktif",
    "members.inactive": "Pasif",

    // Borrow Operations
    "borrow.title": "Ödünç İşlemleri",
    "borrow.lendBook": "Kitap Ödünç Ver",
    "borrow.lendBookDesc": "Bir üyeye kitap ödünç verin.",
    "borrow.activeLoans": "Aktif Ödünç İşlemleri",
    "borrow.activeLoansDesc": "Şu anda ödünç verilen kitaplar",
    "borrow.returnedBooks": "İade Edilen Kitaplar",
    "borrow.returnedBooksDesc": "Son iade edilen kitaplar",
    "borrow.selectBook": "Kitap Seç",
    "borrow.selectMember": "Üye Seç",
    "borrow.selectBookPlaceholder": "Kitap seçin",
    "borrow.selectMemberPlaceholder": "Üye seçin",
    "borrow.lend": "Ödünç Ver",
    "borrow.return": "İade Et",
    "borrow.borrowDate": "Alış",
    "borrow.dueDate": "Teslim",
    "borrow.returnDate": "İade",
    "borrow.completed": "Tamamlandı",

    // Reports
    "reports.title": "Raporlar ve İstatistikler",
    "reports.categoryDistribution": "Kategori Dağılımı",
    "reports.categoryDistributionDesc": "Kitapların kategorilere göre dağılımı",
    "reports.borrowStats": "Ödünç İstatistikleri",
    "reports.borrowStatsDesc": "Ödünç alma ve iade istatistikleri",
    "reports.totalBorrows": "Toplam Ödünç İşlemi",
    "reports.totalReturned": "İade Edilen",
    "reports.activeBorrows": "Aktif Ödünç",
    "reports.books": "kitap",

    // Categories
    "category.technology": "Teknoloji",
    "category.literature": "Edebiyat",
    "category.history": "Tarih",
    "category.science": "Bilim",
    "category.art": "Sanat",
    "category.philosophy": "Felsefe",

    // Common
    "common.add": "Ekle",
    "common.update": "Güncelle",
    "common.edit": "Düzenle",
    "common.delete": "Sil",
    "common.save": "Kaydet",
    "common.cancel": "İptal",
    "common.search": "Ara",
    "common.unknown": "Bilinmeyen",
    "common.unknownBook": "Bilinmeyen Kitap",
    "common.unknownMember": "Bilinmeyen Üye",
  },
  en: {
    // Header
    "header.title": "Smart Library System",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.books": "Books",
    "nav.members": "Members",
    "nav.borrow": "Borrow Operations",
    "nav.reports": "Reports",

    // Dashboard
    "dashboard.totalBooks": "Total Books",
    "dashboard.totalMembers": "Total Members",
    "dashboard.borrowedBooks": "Borrowed Books",
    "dashboard.availableBooks": "Available Books",
    "dashboard.totalBooksDesc": "Total number of books in library",
    "dashboard.totalMembersDesc": "Number of registered members",
    "dashboard.borrowedBooksDesc": "Currently borrowed books",
    "dashboard.availableBooksDesc": "Available books for borrowing",
    "dashboard.recentActivities": "Recent Borrow Activities",
    "dashboard.recentActivitiesDesc": "Latest borrowing transactions",
    "dashboard.borrowed": "Borrowed",
    "dashboard.returned": "Returned",

    // Books
    "books.search": "Search books...",
    "books.allCategories": "All Categories",
    "books.addBook": "Add Book",
    "books.addNewBook": "Add New Book",
    "books.addNewBookDesc": "Add a new book to the library.",
    "books.editBook": "Edit Book",
    "books.editBookDesc": "Update book information.",
    "books.available": "Available",
    "books.title": "Book Title",
    "books.author": "Author",
    "books.isbn": "ISBN",
    "books.category": "Category",
    "books.publishYear": "Publish Year",
    "books.totalCopies": "Total Copies",
    "books.availableCopies": "Available Copies",
    "books.description": "Description",
    "books.selectCategory": "Select category",
    "books.year": "Year",

    // Members
    "members.title": "Member Management",
    "members.addMember": "Add Member",
    "members.addNewMember": "Add New Member",
    "members.addNewMemberDesc": "Add a new member to the library.",
    "members.editMember": "Edit Member",
    "members.editMemberDesc": "Update member information.",
    "members.name": "Full Name",
    "members.email": "Email",
    "members.phone": "Phone",
    "members.membership": "Membership",
    "members.status": "Status",
    "members.active": "Active",
    "members.inactive": "Inactive",

    // Borrow Operations
    "borrow.title": "Borrow Operations",
    "borrow.lendBook": "Lend Book",
    "borrow.lendBookDesc": "Lend a book to a member.",
    "borrow.activeLoans": "Active Loans",
    "borrow.activeLoansDesc": "Currently borrowed books",
    "borrow.returnedBooks": "Returned Books",
    "borrow.returnedBooksDesc": "Recently returned books",
    "borrow.selectBook": "Select Book",
    "borrow.selectMember": "Select Member",
    "borrow.selectBookPlaceholder": "Choose a book",
    "borrow.selectMemberPlaceholder": "Choose a member",
    "borrow.lend": "Lend",
    "borrow.return": "Return",
    "borrow.borrowDate": "Borrowed",
    "borrow.dueDate": "Due",
    "borrow.returnDate": "Returned",
    "borrow.completed": "Completed",

    // Reports
    "reports.title": "Reports and Statistics",
    "reports.categoryDistribution": "Category Distribution",
    "reports.categoryDistributionDesc": "Distribution of books by categories",
    "reports.borrowStats": "Borrow Statistics",
    "reports.borrowStatsDesc": "Borrowing and return statistics",
    "reports.totalBorrows": "Total Borrows",
    "reports.totalReturned": "Total Returned",
    "reports.activeBorrows": "Active Borrows",
    "reports.books": "books",

    // Categories
    "category.technology": "Technology",
    "category.literature": "Literature",
    "category.history": "History",
    "category.science": "Science",
    "category.art": "Art",
    "category.philosophy": "Philosophy",

    // Common
    "common.add": "Add",
    "common.update": "Update",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.search": "Search",
    "common.unknown": "Unknown",
    "common.unknownBook": "Unknown Book",
    "common.unknownMember": "Unknown Member",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("library-language") as Language
    if (savedLanguage && (savedLanguage === "tr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("library-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
