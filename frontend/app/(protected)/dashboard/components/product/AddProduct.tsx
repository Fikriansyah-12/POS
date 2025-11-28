import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { toast } from "@/hooks/useToast";

interface AddOrderDialogProps {
  onAddOrder: (order: {
    customer: string;
    total: string;
    items: number;
    payment: string;
  }) => void;
}

const AddProdukDialog = ({ onAddOrder }: AddOrderDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(0);
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const [items, setItems] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = () => {
    if (!customer || !total || !items || !payment) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field",
        variant: "destructive",
      });
      return;
    }

    onAddOrder({
      customer,
      total: `Rp ${parseInt(total).toLocaleString("id-ID")}`,
      items: parseInt(items),
      payment,
    });

    toast({
      title: "Berhasil",
      description: "Pesanan baru berhasil ditambahkan",
    });

    setCustomer("");
    setTotal("");
    setItems("");
    setPayment("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="customer">Nama Pelanggan</Label>
            <Input
              id="customer"
              placeholder="Masukkan nama pelanggan"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="total">Total (Rp)</Label>
            <Input
              id="total"
              type="number"
              placeholder="Contoh: 450000"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="items">Jumlah Item</Label>
            <Input
              id="items"
              type="number"
              placeholder="Contoh: 5"
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="payment">Metode Pembayaran</Label>
            <Select value={payment} onValueChange={setPayment}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih metode pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tunai">Tunai</SelectItem>
                <SelectItem value="Kartu Debit">Kartu Debit</SelectItem>
                <SelectItem value="Kartu Kredit">Kartu Kredit</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
                <SelectItem value="E-Wallet">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProdukDialog;
