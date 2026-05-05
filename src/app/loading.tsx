export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: '#000000' }}
    >
      <div
        className="h-8 w-8 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: '#39FF14',
          borderRightColor: 'rgba(57,255,20,0.3)',
          boxShadow: '0 0 12px rgba(57,255,20,0.5)',
        }}
      />
    </div>
  );
}
