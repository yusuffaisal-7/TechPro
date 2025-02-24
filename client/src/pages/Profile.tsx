import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "@/components/ReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, Review } from "@shared/schema";

export default function Profile() {
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ["/api/users/1"], // Hardcoded for demo
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const userReviews = reviews?.filter((review) => review.userId === 1);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl">
                    {isLoadingUser ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      user?.username.charAt(0).toUpperCase()
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">
                    {isLoadingUser ? (
                      <Skeleton className="h-9 w-[200px]" />
                    ) : (
                      user?.username
                    )}
                  </h1>
                  <p className="text-muted-foreground mt-1">Member since 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Tabs defaultValue="reviews">
              <TabsList className="w-full">
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reviews" className="mt-6">
                {isLoadingReviews ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-32" />
                    ))}
                  </div>
                ) : userReviews?.length ? (
                  <div className="space-y-4">
                    {userReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No reviews yet
                  </p>
                )}
              </TabsContent>
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Account Settings</h3>
                    <p className="text-muted-foreground mt-2">
                      Account settings coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
