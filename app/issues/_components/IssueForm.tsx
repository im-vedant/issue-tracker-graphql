"use client";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Callout } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Issue } from "@prisma/client";
import {SimpleMdeReact} from "react-simplemde-editor";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { CREATE_ISSUE, UPDATE_ISSUE } from "@/lib/mutations";
import client from "@/lib/apolloClient";

type IssueFormData = z.infer<typeof issueSchema>;
interface Props {
  issue?: Issue;
}
const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    
    try {
      setLoading(true);
      if (issue) 
        {
          let { data : {updateIssue} } = await client.mutate({mutation :UPDATE_ISSUE,variables : {updateIssueId : issue.id, title: data.title, description: data.description }});
          if(updateIssue==null)
            throw new Error("some error occured")
        }
      else 
      {
        let { data : {createIssue} } = await client.mutate({mutation :CREATE_ISSUE,variables : { title: data.title, description: data.description }});
        if(createIssue==null)
          throw new Error("some error occured")
      }
      router.push("/issues/list");
      router.refresh()
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError("An unexpected error occured");
    }
  });
  return (
    <div className="max-w-xl">
      {error.length > 0 && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="max-w-xl space-y-3">
        <TextField.Root
          {...register("title")}
          defaultValue={issue?.title}
          placeholder="Title"
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={loading}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
