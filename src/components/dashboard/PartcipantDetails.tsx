import React, { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building,
  Globe,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Participant } from "@/types";
import Badge from "./Badge";

// Mock data for a participant
const mockParticipant: Participant = {
  id: "12345678-abcd-efgh-ijkl-123456789012",
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.com",
  organization: "Université Paris-Saclay",
  country: "France",
  phone: "+33 6 12 34 56 78",
  registrationDate: "2023-09-15T10:30:00Z",
  type: "participant",
  status: "approved",
};

const ParticipantDetails: React.FC = () => {
  const location = useLocation();
  const [pages, slug, id] = location.pathname.split("/").filter(Boolean);
  const navigate = useNavigate();
  const [participant] = useState<Participant>(mockParticipant);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-amber-600 bg-amber-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5" />;
      case "rejected":
        return <XCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-12">
      {/* Header */}
      <header className="bg-[#F6F7FB] text-galien-blue border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link
            to={`/dashboard?slug=${slug}`}
            className="text-galien-blue p-0 mb-4 flex items-center hover:text-blue-600 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to participants
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 animate-fade-in">
              <div className="text-sm font-medium text-gray-500">
                Participant Details
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {participant.firstName} {participant.lastName}
              </h1>
            </div>

            <div
              className="flex items-center space-x-2 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              <div
                className={cn(
                  "flex items-center px-3 py-1 rounded-full text-sm font-medium",
                  getStatusColor(participant.status)
                )}
              >
                {getStatusIcon(participant.status)}
                <span className="ml-2">
                  {participant.status.charAt(0).toUpperCase() +
                    participant.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Participant info */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="details" className="animate-fade-in">
              <TabsList className="bg-white border border-gray-100">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-[#F6F7FB] data-[state=active]:text-galien-blue"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="badge"
                  className="data-[state=active]:bg-[#F6F7FB] data-[state=active]:text-galien-blue"
                >
                  Badge
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card className="overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border-gray-100">
                  <div className="bg-[#F6F7FB] px-6 py-4 text-galien-blue">
                    <h2 className="text-xl font-display font-semibold">
                      Personal Information
                    </h2>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        className="space-y-1 animate-slide-in"
                        style={{ animationDelay: "50ms" }}
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <User className="h-4 w-4 mr-2 text-galien-blue" />
                          Full Name
                        </div>
                        <div className="font-medium">
                          {participant.firstName} {participant.lastName}
                        </div>
                      </div>

                      <div
                        className="space-y-1 animate-slide-in"
                        style={{ animationDelay: "100ms" }}
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-galien-blue" />
                          Email
                        </div>
                        <div className="font-medium">{participant.email}</div>
                      </div>

                      <div
                        className="space-y-1 animate-slide-in"
                        style={{ animationDelay: "150ms" }}
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-galien-blue" />
                          Phone
                        </div>
                        <div className="font-medium">{participant.phone}</div>
                      </div>

                      <div
                        className="space-y-1 animate-slide-in"
                        style={{ animationDelay: "200ms" }}
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <Building className="h-4 w-4 mr-2 text-galien-blue" />
                          Organization
                        </div>
                        <div className="font-medium">
                          {participant.organization}
                        </div>
                      </div>

                      <div
                        className="space-y-1 animate-slide-in"
                        style={{ animationDelay: "250ms" }}
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-galien-blue" />
                          Country
                        </div>
                        <div className="font-medium">{participant.country}</div>
                      </div>

                      <div
                        className="space-y-1 animate-slide-in"
                        style={{ animationDelay: "300ms" }}
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-galien-blue" />
                          Registration Date
                        </div>
                        <div className="font-medium">
                          {formatDate(participant.registrationDate)}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div
                      className="flex flex-col sm:flex-row sm:justify-between gap-4 animate-fade-in"
                      style={{ animationDelay: "400ms" }}
                    >
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Participant Type
                        </div>
                        <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-[#F6F7FB] text-galien-blue">
                          {participant.type.charAt(0).toUpperCase() +
                            participant.type.slice(1)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Participant ID
                        </div>
                        <div className="font-mono text-sm text-gray-500">
                          {participant.id}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="badge" className="mt-6">
                <Badge participant={participant} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Quick actions */}
          <div className="space-y-6">
            <Card
              className="shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in border-gray-100"
              style={{ animationDelay: "200ms" }}
            >
              <div className="bg-[#F6F7FB] px-6 py-4 text-galien-blue">
                <h2 className="text-xl font-display font-semibold">
                  Quick Actions
                </h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-white hover:bg-opacity-90 text-galien-blue border border-galien-blue">
                  Send Email
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Edit Details
                </Button>

                <Separator />

                <Button
                  variant="ghost"
                  className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  {participant.status === "approved"
                    ? "Revoke Approval"
                    : "Delete Participant"}
                </Button>
              </CardContent>
            </Card>

            <Card
              className="shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in border-gray-100"
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-[#F6F7FB] px-6 py-4 text-galien-blue">
                <h2 className="text-xl font-display font-semibold">
                  Attendance Status
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F6F7FB] mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    Registration Confirmed
                  </h3>
                  <p className="text-gray-500 text-sm">
                    The participant has confirmed their attendance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantDetails;
