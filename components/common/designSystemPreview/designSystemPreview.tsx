"use client";

import { type ReactNode } from "react";
import { InboxIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer/drawer";
import { Empty } from "@/components/ui/empty/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { OtpInput } from "@/components/ui/otpInput/otpInput";
import { Progress } from "@/components/ui/progress/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radioGroup/radioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Separator } from "@/components/ui/separator/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet/sheet";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Switch } from "@/components/ui/switch/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { Textarea } from "@/components/ui/textarea/textarea";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="type-h3 text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function DesignSystemPreview() {
  return (
    <main className="container-app flex flex-col gap-12 py-10">
      <header className="flex flex-col gap-2">
        <p className="type-caption text-muted-foreground">مسیر توسعه</p>
        <h1 className="type-display">سیستم طراحی</h1>
        <p className="type-body-lg max-w-2xl text-muted-foreground">
          پیش‌نمایش داخلی مؤلفه‌های پایه. محتوای این صفحه نمونه خنثی است.
        </p>
      </header>

      <Section title="تایپوگرافی">
        <div className="flex flex-col gap-2">
          <p className="type-display">نمایش</p>
          <p className="type-h1">عنوان یک</p>
          <p className="type-h2">عنوان دو</p>
          <p className="type-h3">عنوان سه</p>
          <p className="type-h4">عنوان چهار</p>
          <p className="type-body-lg">متن بزرگ برای مقدمه بخش‌ها.</p>
          <p className="type-body">متن اصلی با ارتفاع خط مناسب فارسی.</p>
          <p className="type-body-sm">متن کوچک برای توضیحات فرعی.</p>
          <p className="type-caption">کپشن</p>
          <p className="type-label">برچسب</p>
          <p className="ltr-data type-body">+98 21 0000 0000</p>
        </div>
      </Section>

      <Section title="رنگ‌ها">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["پس‌زمینه", "bg-background border border-border"],
            ["سطح", "bg-surface border border-border"],
            ["اصلی", "bg-primary text-primary-foreground"],
            ["ثانویه", "bg-secondary text-secondary-foreground"],
            ["خنثی", "bg-muted text-muted-foreground"],
            ["موفق", "bg-success text-success-foreground"],
            ["هشدار", "bg-warning text-warning-foreground"],
            ["خطر", "bg-danger text-danger-foreground"],
          ].map(([name, classes]) => (
            <div
              key={name}
              className={`rounded-md px-3 py-6 type-body-sm ${classes}`}
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      <Section title="دکمه‌ها">
        <div className="flex flex-wrap items-center gap-3">
          <Button>اصلی</Button>
          <Button variant="secondary">ثانویه</Button>
          <Button variant="outline">خطی</Button>
          <Button variant="ghost">شبح</Button>
          <Button variant="danger">خطر</Button>
          <Button variant="link">پیوند</Button>
          <Button size="sm">کوچک</Button>
          <Button size="lg">بزرگ</Button>
          <Button loading>در حال ارسال</Button>
          <Button disabled>غیرفعال</Button>
        </div>
      </Section>

      <Section title="ورودی‌ها">
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="sample-input" required>
              برچسب
            </FieldLabel>
            <Input id="sample-input" placeholder="مقدار نمونه" />
            <FieldDescription>توضیح کوتاه فیلد.</FieldDescription>
            <FieldHint>متن کمکی اختیاری</FieldHint>
          </Field>
          <Field>
            <FieldLabel htmlFor="sample-phone">شماره تلفن</FieldLabel>
            <Input
              id="sample-phone"
              type="tel"
              placeholder="09120000000"
              autoComplete="tel"
            />
            <FieldHint>ارقام فارسی به انگلیسی تبدیل می‌شوند.</FieldHint>
          </Field>
          <Field invalid>
            <FieldLabel htmlFor="invalid-input">ورودی نامعتبر</FieldLabel>
            <Input
              id="invalid-input"
              aria-invalid
              defaultValue="مقدار نادرست"
            />
            <FieldError>این مقدار معتبر نیست.</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="sample-textarea">متن چندخطی</FieldLabel>
            <Textarea id="sample-textarea" placeholder="توضیحات" />
          </Field>
          <Field>
            <FieldLabel>انتخاب</FieldLabel>
            <Select defaultValue="one">
              <SelectTrigger aria-label="نمونه انتخاب">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">گزینه یک</SelectItem>
                <SelectItem value="two">گزینه دو</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox id="sample-check" />
            <Label htmlFor="sample-check">گزینه</Label>
          </div>
          <RadioGroup defaultValue="a" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="r-a" />
              <Label htmlFor="r-a">الف</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="r-b" />
              <Label htmlFor="r-b">ب</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Switch id="sample-switch" />
            <Label htmlFor="sample-switch">کلید</Label>
          </div>
        </div>
        <OtpInput length={5} aria-label="رمز یک‌بارمصرف" />
        <FileUpload description="پرونده را بکشید یا انتخاب کنید." />
      </Section>

      <Section title="نشان و کارت">
        <div className="flex flex-wrap gap-2">
          <Badge>اصلی</Badge>
          <Badge variant="secondary">ثانویه</Badge>
          <Badge variant="outline">خطی</Badge>
          <Badge variant="success">موفق</Badge>
          <Badge variant="warning">هشدار</Badge>
          <Badge variant="danger">خطر</Badge>
          <Badge variant="info">اطلاعات</Badge>
        </div>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>کارت نمونه</CardTitle>
            <CardDescription>
              سطح سبک با حاشیه، بدون سایه سنگین.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>نم</AvatarFallback>
              </Avatar>
              <p className="type-body-sm">آواتار با متن جایگزین</p>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="وضعیت‌ها">
        <div className="grid gap-3">
          <Alert variant="info">
            <InboxIcon />
            <AlertTitle>اطلاعات</AlertTitle>
            <AlertDescription>پیام خنثی برای راهنمایی کاربر.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>موفق</AlertTitle>
            <AlertDescription>عملیات با موفقیت انجام شد.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>هشدار</AlertTitle>
            <AlertDescription>قبل از ادامه بررسی کنید.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>خطا</AlertTitle>
            <AlertDescription>درخواست انجام نشد.</AlertDescription>
          </Alert>
        </div>
        <div className="flex items-center gap-4">
          <Spinner />
          <Skeleton className="h-11 w-40" />
        </div>
        <Progress value={48} />
        <Empty
          icon={<InboxIcon />}
          title="موردی وجود ندارد"
          description="وقتی داده‌ای نباشد این الگو نمایش داده می‌شود."
          action={<Button variant="outline">اقدام</Button>}
        />
      </Section>

      <Section title="رویه‌ها و ناوبری">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">گفتگو</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>عنوان گفتگو</DialogTitle>
                <DialogDescription>
                  توضیح کوتاه برای محتوای مودال.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">شیت</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>عنوان شیت</SheetTitle>
                <SheetDescription>
                  سطح کناری برای جزئیات یا فیلتر.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">کشو</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>عنوان کشو</DrawerTitle>
                <DrawerDescription>سطح پایین مناسب موبایل.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">یک</TabsTrigger>
            <TabsTrigger value="two">دو</TabsTrigger>
          </TabsList>
          <TabsContent value="one">محتوای زبانه یک</TabsContent>
          <TabsContent value="two">محتوای زبانه دو</TabsContent>
        </Tabs>
        <Accordion type="single" collapsible className="max-w-xl">
          <AccordionItem value="a">
            <AccordionTrigger>پرسش نمونه</AccordionTrigger>
            <AccordionContent>
              پاسخ کوتاه برای نمایش باز و بسته شدن.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>مورد دوم</AccordionTrigger>
            <AccordionContent>متن کمکی بیشتر.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
      </Section>
    </main>
  );
}
