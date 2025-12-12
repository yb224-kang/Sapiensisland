import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("문의 내용:", formData);
    // TODO: 실제 제출 로직 구현
    alert("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle
            className="text-[1.5rem] md:text-[1.75rem] text-[var(--section-text-primary)]"
            style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 700 }}
          >
            문의하기
          </DialogTitle>
          <DialogDescription
            className="text-[0.875rem] md:text-[1rem] text-[var(--section-text-secondary)]"
            style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 400 }}
          >
            정보를 입력해주시면 빠르게 연락드리겠습니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* 이름 */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[0.875rem] md:text-[1rem]"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 600 }}
            >
              이름 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
              className="h-11 transition-all duration-300 border-gray-200 focus:border-[var(--section-brand-primary)] focus:ring-2 focus:ring-[var(--section-brand-primary)]/20"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 400 }}
            />
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[0.875rem] md:text-[1rem]"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 600 }}
            >
              이메일 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className="h-11 transition-all duration-300 border-gray-200 focus:border-[var(--section-brand-primary)] focus:ring-2 focus:ring-[var(--section-brand-primary)]/20"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 400 }}
            />
          </div>

          {/* 전화번호 */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-[0.875rem] md:text-[1rem]"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 600 }}
            >
              전화번호 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="010-1234-5678"
              className="h-11 transition-all duration-300 border-gray-200 focus:border-[var(--section-brand-primary)] focus:ring-2 focus:ring-[var(--section-brand-primary)]/20"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 400 }}
            />
          </div>

          {/* 회사명 */}
          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="text-[0.875rem] md:text-[1rem]"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 600 }}
            >
              회사명
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="회사명을 입력해주세요"
              className="h-11 transition-all duration-300 border-gray-200 focus:border-[var(--section-brand-primary)] focus:ring-2 focus:ring-[var(--section-brand-primary)]/20"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 400 }}
            />
          </div>

          {/* 문의내용 */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-[0.875rem] md:text-[1rem]"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 600 }}
            >
              문의내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="문의하실 내용을 자세히 입력해주세요"
              className="min-h-[120px] resize-none transition-all duration-300 border-gray-200 focus:border-[var(--section-brand-primary)] focus:ring-2 focus:ring-[var(--section-brand-primary)]/20"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 400 }}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 border-gray-300 hover:bg-gray-100 transition-all duration-300"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 500 }}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-[var(--section-brand-primary)] hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
              style={{ fontFamily: "Pretendard Variable, sans-serif", fontWeight: 600 }}
            >
              문의하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}