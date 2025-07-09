"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Users,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  BookMarked,
  RotateCcw,
  CheckCircle,
  Library,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  publishYear: number
  copies: number
  availableCopies: number
  description: string
  addedDate: string
}

interface Member {
  id: string
  name: string
  email: string
  phone: string
  membershipDate: string
  status: "active" | "inactive"
}

interface BorrowRecord {
  id: string
  bookId: string
  memberId: string
  borrowDate: string
  dueDate: string
  returnDate?: string
  status: "borrowed" | "returned" | "overdue"
}

export default function LibraryManagementSystem() {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [books, setBooks] = useState<Book[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isBorrowBookOpen, setIsBorrowBookOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [editingMember, setEditingMember] = useState<Member | null>(null)

  // Sample data initialization
  useEffect(() => {
    const sampleBooks: Book[] = [
      {
        id: "1",
        title: "Yapay Zeka ve Makine Öğrenmesi",
        author: "Dr. Ahmet Yılmaz",
        isbn: "978-605-123-456-7",
        category: "Teknoloji",
        publishYear: 2023,
        copies: 5,
        availableCopies: 3,
        description: "Modern yapay zeka teknikleri ve uygulamaları hakkında kapsamlı bir rehber.",
        addedDate: "2024-01-15",
      },
      {
        id: "2",
        title: "Suç ve Ceza",
        author: "Fyodor Dostoyevski",
        isbn: "978-975-123-789-0",
        category: "Edebiyat",
        publishYear: 1866,
        copies: 8,
        availableCopies: 6,
        description: "Rus edebiyatının başyapıtlarından biri.",
        addedDate: "2024-01-10",
      },
      {
        id: "3",
        title: "Osmanlı Tarihi",
        author: "Prof. Dr. Mehmet Özkan",
        isbn: "978-605-987-654-3",
        category: "Tarih",
        publishYear: 2022,
        copies: 4,
        availableCopies: 2,
        description: "Osmanlı İmparatorluğunun kuruluşundan yıkılışına kadar detaylı tarih.",
        addedDate: "2024-01-20",
      },
    ]

    const sampleMembers: Member[] = [
      {
        id: "1",
        name: "Ayşe Demir",
        email: "ayse.demir@email.com",
        phone: "0532 123 45 67",
        membershipDate: "2024-01-01",
        status: "active",
      },
      {
        id: "2",
        name: "Mehmet Kaya",
        email: "mehmet.kaya@email.com",
        phone: "0533 987 65 43",
        membershipDate: "2024-01-05",
        status: "active",
      },
    ]

    const sampleBorrowRecords: BorrowRecord[] = [
      {
        id: "1",
        bookId: "1",
        memberId: "1",
        borrowDate: "2024-01-25",
        dueDate: "2024-02-08",
        status: "borrowed",
      },
    ]

    setBooks(sampleBooks)
    setMembers(sampleMembers)
    setBorrowRecords(sampleBorrowRecords)
  }, [])

  const categories = ["all", "Teknoloji", "Edebiyat", "Tarih", "Bilim", "Sanat", "Felsefe"]

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addBook = (bookData: Omit<Book, "id" | "addedDate">) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      addedDate: new Date().toISOString().split("T")[0],
    }
    setBooks([...books, newBook])
    setIsAddBookOpen(false)
  }

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
    setEditingBook(null)
  }

  const deleteBook = (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId))
  }

  const addMember = (memberData: Omit<Member, "id" | "membershipDate">) => {
    const newMember: Member = {
      ...memberData,
      id: Date.now().toString(),
      membershipDate: new Date().toISOString().split("T")[0],
    }
    setMembers([...members, newMember])
    setIsAddMemberOpen(false)
  }

  const updateMember = (updatedMember: Member) => {
    setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)))
    setEditingMember(null)
  }

  const deleteMember = (memberId: string) => {
    setMembers(members.filter((member) => member.id !== memberId))
  }

  const borrowBook = (bookId: string, memberId: string) => {
    const book = books.find((b) => b.id === bookId)
    if (book && book.availableCopies > 0) {
      const newBorrowRecord: BorrowRecord = {
        id: Date.now().toString(),
        bookId,
        memberId,
        borrowDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "borrowed",
      }
      setBorrowRecords([...borrowRecords, newBorrowRecord])
      setBooks(books.map((b) => (b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b)))
    }
  }

  const returnBook = (recordId: string) => {
    const record = borrowRecords.find((r) => r.id === recordId)
    if (record) {
      setBorrowRecords(
        borrowRecords.map((r) =>
          r.id === recordId ? { ...r, returnDate: new Date().toISOString().split("T")[0], status: "returned" } : r,
        ),
      )
      setBooks(books.map((b) => (b.id === record.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b)))
    }
  }

  const getBookTitle = (bookId: string) => {
    return books.find((b) => b.id === bookId)?.title || t("common.unknownBook")
  }

  const getMemberName = (memberId: string) => {
    return members.find((m) => m.id === memberId)?.name || t("common.unknownMember")
  }

  const stats = {
    totalBooks: books.length,
    totalMembers: members.length,
    borrowedBooks: borrowRecords.filter((r) => r.status === "borrowed").length,
    availableBooks: books.reduce((sum, book) => sum + book.availableCopies, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Library className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">{t("header.title")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">{t("nav.dashboard")}</TabsTrigger>
            <TabsTrigger value="books">{t("nav.books")}</TabsTrigger>
            <TabsTrigger value="members">{t("nav.members")}</TabsTrigger>
            <TabsTrigger value="borrow">{t("nav.borrow")}</TabsTrigger>
            <TabsTrigger value="reports">{t("nav.reports")}</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.totalBooks")}</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBooks}</div>
                  <p className="text-xs text-muted-foreground">{t("dashboard.totalBooksDesc")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.totalMembers")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">{t("dashboard.totalMembersDesc")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.borrowedBooks")}</CardTitle>
                  <BookMarked className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.borrowedBooks}</div>
                  <p className="text-xs text-muted-foreground">{t("dashboard.borrowedBooksDesc")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.availableBooks")}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.availableBooks}</div>
                  <p className="text-xs text-muted-foreground">{t("dashboard.availableBooksDesc")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.recentActivities")}</CardTitle>
                <CardDescription>{t("dashboard.recentActivitiesDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowRecords
                    .slice(-5)
                    .reverse()
                    .map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {record.status === "borrowed" ? (
                              <BookMarked className="h-5 w-5 text-blue-500" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{getBookTitle(record.bookId)}</p>
                            <p className="text-sm text-muted-foreground">{getMemberName(record.memberId)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={record.status === "borrowed" ? "default" : "secondary"}>
                            {record.status === "borrowed" ? t("dashboard.borrowed") : t("dashboard.returned")}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{record.borrowDate}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Books */}
          <TabsContent value="books" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t("books.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Kategori seç" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? t("books.allCategories") : t(`category.${category.toLowerCase()}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("books.addBook")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("books.addNewBook")}</DialogTitle>
                    <DialogDescription>{t("books.addNewBookDesc")}</DialogDescription>
                  </DialogHeader>
                  <BookForm onSubmit={addBook} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription className="mt-1">{book.author}</CardDescription>
                      </div>
                      <Badge variant="outline">{t(`category.${book.category.toLowerCase()}`)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{book.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span>ISBN: {book.isbn}</span>
                        <span>Yıl: {book.publishYear}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{t("books.available")}:</span>
                          <Badge variant={book.availableCopies > 0 ? "default" : "destructive"}>
                            {book.availableCopies}/{book.copies}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingBook(book)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteBook(book.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Book Dialog */}
            <Dialog open={!!editingBook} onOpenChange={() => setEditingBook(null)}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("books.editBook")}</DialogTitle>
                  <DialogDescription>{t("books.editBookDesc")}</DialogDescription>
                </DialogHeader>
                {editingBook && <BookForm book={editingBook} onSubmit={updateBook} />}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Members */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t("members.title")}</h2>
              <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("members.addMember")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("members.addNewMember")}</DialogTitle>
                    <DialogDescription>{t("members.addNewMemberDesc")}</DialogDescription>
                  </DialogHeader>
                  <MemberForm onSubmit={addMember} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.email}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status === "active" ? t("members.active") : t("members.inactive")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>
                          {t("members.phone")}: {member.phone}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {t("members.membership")}: {member.membershipDate}
                        </span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingMember(member)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteMember(member.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Member Dialog */}
            <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("members.editMember")}</DialogTitle>
                  <DialogDescription>{t("members.editMemberDesc")}</DialogDescription>
                </DialogHeader>
                {editingMember && <MemberForm member={editingMember} onSubmit={updateMember} />}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Borrow Operations */}
          <TabsContent value="borrow" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t("borrow.title")}</h2>
              <Dialog open={isBorrowBookOpen} onOpenChange={setIsBorrowBookOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <BookMarked className="h-4 w-4 mr-2" />
                    {t("borrow.lendBook")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("borrow.lendBook")}</DialogTitle>
                    <DialogDescription>{t("borrow.lendBookDesc")}</DialogDescription>
                  </DialogHeader>
                  <BorrowForm
                    books={books.filter((b) => b.availableCopies > 0)}
                    members={members.filter((m) => m.status === "active")}
                    onSubmit={(bookId, memberId) => {
                      borrowBook(bookId, memberId)
                      setIsBorrowBookOpen(false)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("borrow.activeLoans")}</CardTitle>
                <CardDescription>{t("borrow.activeLoansDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowRecords
                    .filter((record) => record.status === "borrowed")
                    .map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <BookMarked className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{getBookTitle(record.bookId)}</p>
                            <p className="text-sm text-muted-foreground">{getMemberName(record.memberId)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm">
                              {t("borrow.borrowDate")}: {record.borrowDate}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("borrow.dueDate")}: {record.dueDate}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => returnBook(record.id)}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            {t("borrow.return")}
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("borrow.returnedBooks")}</CardTitle>
                <CardDescription>{t("borrow.returnedBooksDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {borrowRecords
                    .filter((record) => record.status === "returned")
                    .slice(-10)
                    .reverse()
                    .map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">{getBookTitle(record.bookId)}</p>
                            <p className="text-sm text-muted-foreground">{getMemberName(record.memberId)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {t("borrow.returnDate")}: {record.returnDate}
                          </p>
                          <Badge variant="secondary">{t("borrow.completed")}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">{t("reports.title")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("reports.categoryDistribution")}</CardTitle>
                  <CardDescription>{t("reports.categoryDistributionDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.slice(1).map((category) => {
                      const count = books.filter((book) => book.category === category).length
                      const percentage = books.length > 0 ? (count / books.length) * 100 : 0
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span>
                              {count} {t("reports.books")}
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("reports.borrowStats")}</CardTitle>
                  <CardDescription>{t("reports.borrowStatsDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <span className="text-sm font-medium">{t("reports.totalBorrows")}</span>
                      <span className="text-lg font-bold text-blue-600">{borrowRecords.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <span className="text-sm font-medium">{t("reports.totalReturned")}</span>
                      <span className="text-lg font-bold text-green-600">
                        {borrowRecords.filter((r) => r.status === "returned").length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <span className="text-sm font-medium">{t("reports.activeBorrows")}</span>
                      <span className="text-lg font-bold text-orange-600">
                        {borrowRecords.filter((r) => r.status === "borrowed").length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Book Form Component
function BookForm({ book, onSubmit }: { book?: Book; onSubmit: (book: any) => void }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    isbn: book?.isbn || "",
    category: book?.category || "",
    publishYear: book?.publishYear || new Date().getFullYear(),
    copies: book?.copies || 1,
    availableCopies: book?.availableCopies || 1,
    description: book?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(book ? { ...book, ...formData } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">{t("books.title")}</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">{t("books.author")}</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="isbn">{t("books.isbn")}</Label>
          <Input
            id="isbn"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">{t("books.category")}</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t("books.selectCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Teknoloji">Teknoloji</SelectItem>
              <SelectItem value="Edebiyat">Edebiyat</SelectItem>
              <SelectItem value="Tarih">Tarih</SelectItem>
              <SelectItem value="Bilim">Bilim</SelectItem>
              <SelectItem value="Sanat">Sanat</SelectItem>
              <SelectItem value="Felsefe">Felsefe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publishYear">{t("books.publishYear")}</Label>
          <Input
            id="publishYear"
            type="number"
            value={formData.publishYear}
            onChange={(e) => setFormData({ ...formData, publishYear: Number.parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="copies">{t("books.totalCopies")}</Label>
          <Input
            id="copies"
            type="number"
            min="1"
            value={formData.copies}
            onChange={(e) => setFormData({ ...formData, copies: Number.parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableCopies">{t("books.availableCopies")}</Label>
          <Input
            id="availableCopies"
            type="number"
            min="0"
            max={formData.copies}
            value={formData.availableCopies}
            onChange={(e) => setFormData({ ...formData, availableCopies: Number.parseInt(e.target.value) })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">{t("books.description")}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <DialogFooter>
        <Button type="submit">{book ? t("common.update") : t("common.add")}</Button>
      </DialogFooter>
    </form>
  )
}

// Member Form Component
function MemberForm({ member, onSubmit }: { member?: Member; onSubmit: (member: any) => void }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    phone: member?.phone || "",
    status: member?.status || "active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(member ? { ...member, ...formData } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t("members.name")}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("members.email")}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("members.phone")}</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">{t("members.status")}</Label>
        <Select
          value={formData.status}
          onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t("members.active")}</SelectItem>
            <SelectItem value="inactive">{t("members.inactive")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="submit">{member ? "Güncelle" : "Ekle"}</Button>
      </DialogFooter>
    </form>
  )
}

// Borrow Form Component
function BorrowForm({
  books,
  members,
  onSubmit,
}: {
  books: Book[]
  members: Member[]
  onSubmit: (bookId: string, memberId: string) => void
}) {
  const { t } = useLanguage()
  const [selectedBook, setSelectedBook] = useState("")
  const [selectedMember, setSelectedMember] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedBook && selectedMember) {
      onSubmit(selectedBook, selectedMember)
      setSelectedBook("")
      setSelectedMember("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="book">{t("borrow.selectBook")}</Label>
        <Select value={selectedBook} onValueChange={setSelectedBook}>
          <SelectTrigger>
            <SelectValue placeholder={t("borrow.selectBookPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {books.map((book) => (
              <SelectItem key={book.id} value={book.id}>
                {book.title} - {book.author} ({t("books.available")}: {book.availableCopies})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="member">{t("borrow.selectMember")}</Label>
        <Select value={selectedMember} onValueChange={setSelectedMember}>
          <SelectTrigger>
            <SelectValue placeholder={t("borrow.selectMemberPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {members.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name} - {member.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={!selectedBook || !selectedMember}>
          {t("borrow.lend")}
        </Button>
      </DialogFooter>
    </form>
  )
}
