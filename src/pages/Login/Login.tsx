import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context";

const formSchema = z.object({
  email: z.string().min(1, { message: "This is a required field" }).email(),
  password: z.string().min(1, { message: "This is a required field" }),
});

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isValid = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email: values.email,
            password: values.password,
          }
        );
        const responseData = response.data;
        if (responseData.status === false) {
          toast({
            title: "Something went wrong!",
            description: responseData.message,
          });
        } else {
          localStorage.setItem("user", JSON.stringify(responseData));
          login(responseData.message);
        }
      } catch (err) {
        toast({
          title: "Something went wrong!",
          description: "Please try again later",
        });
      }
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[435px] min-h-[30rem] flex flex-col gap-7 rounded-3xl border-white border-[0.1rem] p-6">
        <h1 className="tracking-tight text-2xl font-semibold">
          Login to continue
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-tight text-[17px] font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-tight text-[17px] font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="👀" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-white text-black hover:bg-violet-500 text-[17px]"
              type="submit"
            >
              Submit
            </Button>
            <h3 className="tracking-tight text-lg">
              Don&apos;t have an account?
              <span>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="link"
                  className="hover:text-violet-500 tracking-tight text-lg"
                >
                  Create one!
                </Button>
              </span>
            </h3>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
