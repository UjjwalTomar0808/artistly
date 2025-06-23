"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockSubmissions, type ArtistSubmission } from "@/lib/mock-data"
import { Search, Filter, Eye, Check, X, Users, Clock, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ManagerDashboard() {
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>(mockSubmissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const { toast } = useToast()

  // Filter submissions based on search and filters
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || submission.status === statusFilter
    const matchesCategory = !categoryFilter || submission.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Handle status updates
  const updateSubmissionStatus = (id: number, newStatus: "approved" | "rejected") => {
    setSubmissions((prev) =>
      prev.map((submission) => (submission.id === id ? { ...submission, status: newStatus } : submission)),
    )

    const submission = submissions.find((s) => s.id === id)
    toast({
      title: `Application ${newStatus}`,
      description: `${submission?.name}'s application has been ${newStatus}.`,
    })
  }

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Calculate stats
  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Musicians">Musicians</SelectItem>
                <SelectItem value="Dancers">Dancers</SelectItem>
                <SelectItem value="Speakers">Speakers</SelectItem>
                <SelectItem value="DJs">DJs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Artist Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artist Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fee Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{submission.name}</div>
                          <div className="text-sm text-gray-500">{submission.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{submission.location}</TableCell>
                      <TableCell className="font-medium text-blue-600">{submission.feeRange}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {submission.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateSubmissionStatus(submission.id, "approved")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateSubmissionStatus(submission.id, "rejected")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-gray-400">
                        <Users className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-lg font-medium">No applications found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
