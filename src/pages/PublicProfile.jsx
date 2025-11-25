import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import ReflectionCard from "../components/reflections/ReflectionCard";
import { useAuth } from "../context/useAuthHook";
import {
  fetchUserReflections,
  deleteReflection,
} from "../features/reflections/api/reflectionAPI";
import { Public } from "@mui/icons-material";

const PublicProfile = () => {
  const [userReflections, setUserReflections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // تحميل التأملات المرتبطة بالمستخدم
  useEffect(() => {
    const fetchReflections = async () => {
      if (!currentUser) return;

      setIsLoading(true);

      const reflections = await fetchUserReflections(currentUser.id);
      setUserReflections(reflections);
      setIsLoading(false);
    };

    fetchReflections();
  }, [currentUser]);

  // حذف تأمل
  const confirmDelete = async (id) => {
    await deleteReflection(id);
    setUserReflections((prev) => prev.filter((r) => r.id !== id));
  };

  if (!currentUser) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {console.log("in public profile current user is :", currentUser)}
          لم يتم تسجيل الدخول
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", mr: 2 }}>
          {currentUser.name?.charAt(0) || "م"}
        </Avatar>
        <Box>
          <Typography variant="h6">{currentUser.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        تأملاتي
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : userReflections.length === 0 ? (
        <Typography color="text.secondary">لا توجد تأملات حتى الآن.</Typography>
      ) : (
        userReflections.map((item) => (
          <ReflectionCard
            key={item.id}
            reflection={item}
            onDelete={confirmDelete}
          />
        ))
      )}
    </Container>
  );
};

export default PublicProfile;
