import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReviewSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@shared/schema";
import { motion } from 'framer-motion';

export default function Reviews() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: {
      content: "",
      rating: 5,
      userId: 1, // Hardcoded for demo
    },
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await apiRequest("POST", "/api/reviews", formData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      form.reset();
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (data.photo?.[0]) {
      formData.append("photo", data.photo[0]);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">Customer Reviews</h1>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold">Write a Review</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="5" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <motion.div
                      className="h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
            <div className="space-y-4">
              {isLoadingReviews ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="bg-muted rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted-foreground/10 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 bg-muted-foreground/10 animate-pulse rounded" />
                        <div className="h-4 w-full bg-muted-foreground/10 animate-pulse rounded" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                reviews?.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}