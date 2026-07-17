import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "@/i18n/server";
import { headers } from "next/headers";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

async function getTasks(): Promise<Task[]> {
  const headersList = headers();
  const host = headersList.get("host");

  if (!host) return [];

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocol}://${host}/api/tasks`, {
    cache: "no-store",
  });

  if (!response.ok) return [];

  return response.json();
}

export default async function TasksPage() {
  const tasks = await getTasks();
  const { t } = getTranslations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("tasks.title")}</h1>

      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle>{t("tasks.yourTasks")}</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground">{t("tasks.empty")}</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                    {task.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {task.completed ? t("tasks.done") : t("tasks.pending")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
